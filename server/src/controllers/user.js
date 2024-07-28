import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import Booking from "../models/booking.js";
import Subject from "../models/subject.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(401).json({ message: "User already exists." });

    const hashPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email: email,
      password: hashPassword,
      name: req.body.name,
      instituteEmail: req.body?.instituteEmail,
      dob: req.body.dob,
      gender: req.body.gender,
      city: req.body?.city,
      phone: req.body.phone,
      programme: req.body.programme,
      branch: req.body.branch,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "24h",
    });
    res.status(201).json({ result: result, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res
        .status(401)
        .json({ message: "UNAUTHORIZED: Invalid credentials" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "24h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Could not sign in." });
  }
};

export const getUserSubjects = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated." });

    const user = await User.findById(req.user);
    const userStudySubs = [];
    const userTeachSubs = [];

    for (const subject of user.studySub) {
      const subjectDetails = await Subject.findById(subject._id);
      userStudySubs.push(subjectDetails);
    }

    for (const subject of user.teachSub) {
      const subjectDetails = await Subject.findById(subject._id);
      userTeachSubs.push(subjectDetails);
    }

    return res
      .status(200)
      .json({ studySubjects: userStudySubs, teachSubjects: userTeachSubs });
  } catch (err) {
    console.log(err);
    return res.json(err);
  }
};

export const addSubjects = async (req, res) => {
  const subjects = req.body;
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated." });

    const user = await User.findById(req.user);

    // Add subjects to user schema
    if (subjects.studySub) {
      user.studySub = [...subjects.studySub];
    }

    if (subjects.teachSub) {
      user.teachSub = [...subjects.teachSub];
    }

    // Update user schema
    const updatedUser = await user.save();

    // Add user ID to subject schema
    const addUserIdToSubject = async (subjectId, userId, field) => {
      await Subject.findByIdAndUpdate(
        subjectId,
        { $addToSet: { [field]: userId } },
        { new: true }
      );
    };

    // Add user ID to corresponding subjects
    for (const studySubId of subjects.studySub) {
      await addUserIdToSubject(studySubId, user._id, "students");
    }

    for (const teachSubId of subjects.teachSub) {
      await addUserIdToSubject(teachSubId, user._id, "teachers");
    }

    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { ...user, id },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (req, res) => {
  const id = req.query.id;
  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found." });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export const getByToken = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthenticated." });
  try {
    const user = await User.findById(req.user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

export const searchUser = async (req, res) => {
  const query = req.query.name;
  try {
    const users = await User.find({
      name: { $regex: query, $options: "i" },
    })
      .sort({ teachRating: -1 }) // Sort by teacher rating in descending order
      .limit(10); // Limit the results to 10 users

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

export const getUserSlots = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthenticated." });

  try {
    const user = await User.findById(req.user);

    if (!user) return res.status(404).json({ message: "User not found." });

    const populatedUser = await User.populate(user, { path: "slots._id" });

    const slots = populatedUser.slots.map((slot) => ({
      _id: slot._id._id,
      teacher: slot._id.teacher,
      student: slot._id.student,
      date: slot._id.date,
      roomId: slot._id.roomId,
      startTime: slot._id.startTime,
      endTime: slot._id.endTime,
      subject: slot._id.subject,
      role: slot.role,
    }));

    res.status(200).json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};