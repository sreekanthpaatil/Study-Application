import express from "express";
import {
  createPost,
  downloadResource,
  getPostsByCategory,
  getPostsByCommunity,
  uploadFile,
  fetchPosts,
  fetchPostsByUser,
  trendingPosts,
} from "../controllers/post.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/list", [auth], fetchPosts);
router.get("/creator/:id", [auth], fetchPostsByUser);
router.post("/create", [auth], uploadFile, createPost);
router.get("/community/:community", [auth], getPostsByCommunity);
router.get("/trending", [auth], trendingPosts);
// router.get("/:category", [auth], getPostsByCategory);
// router.get("/download/:id", [auth], downloadResource);
// router.post('/createImg', [auth], uploadFile, imageUpload);

export default router;