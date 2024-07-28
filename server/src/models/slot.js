import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    references: "User",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    references: "User",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    references: "Subject",
    required: true,
  },
});

export default mongoose.model("Slot", slotSchema);