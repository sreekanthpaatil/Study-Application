import Subject from "../models/subject.js";

export const createSubject = async (req, res) => {
  try {
    const subjects = req.body;
    if (!req.user) return res.status(401).json({ message: "Unauthenticated." });

    const subject = new Subject(subjects);

    await subject.save();
    // Return a success message or the created post
    return res.status(201).json(subject);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated." });

    const subjects = await Subject.find();

    return res.status(200).json({ subjects: subjects });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSubjectFromId = async (req, res) => {
  const id = req.query.id;
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated." });

    const subject = await Subject.findById(id);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found." });
    }

    return res.status(200).json({ subject: subject });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchSubjectAndTeachers = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated." });

    const name = req.query.name;

    // Find the subject by name and populate the 'teachers' field
    const subject = await Subject.findOne({ name }).populate({
      path: "teachers",
      model: "User", // Use the correct model name ('User' in this case)
      select: "name email teachRating", // Specify the fields you want to populate
    });

    if (!subject) {
      return res.status(404).json({ message: "Subject not found." });
    }

    // Extract and sort teachers based on teachRating.rating
    console.log(subject);
    const sortedTeachers = subject.teachers
      .map((teacher) => ({
        ...teacher.toObject(), // Convert Mongoose document to plain JavaScript object
        teachRating: parseInt(teacher.teachRating.rating) || 0,
      }))
      .sort((a, b) => b.teachRating - a.teachRating)
      .slice(0, 10); // Get only the first 10 results

    return res.status(200).json(sortedTeachers);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};