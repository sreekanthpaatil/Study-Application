import User from "../models/user.js";
import Slot from "../models/slot.js";

const generateRoomID = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let roomID = "";
  for (let i = 0; i < 4; i++) {
    roomID += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return roomID;
};

export const createSlot = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated." });
    const { teacher, student, date, startTime, endTime, subject } = req.body;

    if (!teacher || !student || !date || !startTime || !endTime || !subject) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const roomId = generateRoomID();

    const newSlot = new Slot({
      teacher,
      student,
      date,
      roomId,
      startTime,
      endTime,
      subject,
    });

    await newSlot.save();

    await User.findByIdAndUpdate(
      teacher,
      { $addToSet: { slots: { _id: newSlot._id, role: "teacher" } } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      student,
      { $addToSet: { slots: { _id: newSlot._id, role: "student" } } },
      { new: true }
    );

    return res
      .status(201)
      .json({ message: "Slot created successfully.", slot: newSlot });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getSlot = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated." });

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Slot ID is required." });
    }

    const slot = await Slot.findById(id);

    if (!slot) {
      return res.status(404).json({ message: "Slot not found." });
    }

    return res.status(200).json({ slot });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};