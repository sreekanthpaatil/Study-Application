import Post from "../models/post.js";
import User from "../models/user.js";
import Community from "../models/community.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";

// Ensure that the pdf_uploads directory exists

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pdfUploadsDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(pdfUploadsDir)) {
  fs.mkdirSync(pdfUploadsDir);
}

const pdfStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pdfUploadsDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: pdfStorage });

// export const getPosts = async (req, res) => {
//   try {
//     if (!req.user) return res.status(401).json({ message: "Unauthenticated." });

//     const posts = await Post.find();
//     console.log(posts);

//     return res.status(200).json({ message: "Posts fetched!", posts: posts });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

export const fetchPosts = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated." });

    const posts = await Post.find();

    return res.status(200).json({ message: "Posts fetched!", posts: posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const trendingPosts = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated." });

    const posts = await Post.find().sort({ createdAt: -1 }).limit(5);

    return res
      .status(200)
      .json({ message: "Latest 5 posts fetched!", posts: posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const fetchPostsByUser = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated." });

    const { id } = req.params;

    const posts = await Post.find({ creator: id });

    return res.status(200).json({ message: "Posts fetched!", posts: posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const uploadFile = upload.single("file");

export const createPost = async (req, res) => {
  try {
    const { title, category, text } = req.body;

    if (!req.user) return res.status(401).json({ message: "Unauthenticated." });

    let fileLink;
    let communities = [];
    let concepts = [];

    if (req.body.communities) {
      communities = req.body.communities;
    }
    if (req.body.concepts) {
      concepts = req.body.concepts;
    }

    if (req.body.file) {
      console.log("FILE DETECTED");
      const filename = req.body.file.name;
      fileLink = `http://localhost:3300/uploads/${filename}`;
    }

    const post = new Post({
      creator: req.user,
      title,
      category,
      text,
      file: fileLink,
      communities: communities,
      concepts: concepts,
    });

    console.log(post);

    await post.save();

    await User.findByIdAndUpdate(
      req.user,
      { $push: { posts: post._id } },
      { new: true }
    );

    for (const community of communities) {
      await Community.findByIdAndUpdate(
        community,
        { $push: { posts: post._id } },
        { new: true }
      );
    }

    return res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    console.error(`Here is the ${error}`);
    return res.status(500).json(error);
  }
};

export const getPostsByCommunity = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated." });

    const community = req.params.community;

    if (!community) {
      return res
        .status(400)
        .json({ message: "Community Parameter is required" });
    }

    const posts = await Post.find({ community });

    if (posts.length === 0) {
      return res.status(404).json({ message: "No Posts Found!" });
    }

    return res
      .status(200)
      .json({ message: "Posts fetched successfully", posts });
  } catch (err) {
    console.log(err);
  }
};

export const getPostsByCategory = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated." });

    const { category } = req.params;

    // Check if category is provided
    if (!category) {
      return res
        .status(400)
        .json({ message: "Category parameter is required" });
    }

    // Fetch posts by category from the database
    const posts = await Post.find({ category });

    // Return the posts in the response
    return res
      .status(200)
      .json({ message: "Posts fetched successfully", posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const downloadResource = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated." });

    const { id } = req.params;
    // Fetch post information by ID
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Extract filename from the file URL
    const filename = path.basename(post.file);

    // Assuming the PDFs are stored in the 'pdf_uploads' directory
    const filePath = path.join(__dirname, "../pdf_uploads", filename);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "File not found" });
    }

    // Set the Content-Disposition header to trigger download
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Type", "application/pdf");

    // Stream the file to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const imageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    // Convert the buffer to base64
    const base64Image = req.file.toString("base64");

    // Save the base64 image to MongoDB
    const newImage = new Image({ base64: base64Image });
    await newImage.save();

    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};