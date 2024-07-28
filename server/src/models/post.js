import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: { type: String, required: true },
    category: [
      {
        type: String,
      },
    ],
    concepts: [
      {
        type: String,
      },
    ],
    communities: [
      {
        type: String,
      },
    ],
    file: {
      type: String,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);