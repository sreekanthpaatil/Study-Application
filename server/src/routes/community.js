import express from "express";
import { auth } from "../middleware/auth.js";
import {
  createCommunity,
  getCommunities,
  getCommunity,
  getCommunityPosts,
  getUserCommunities,
  getCommunityByName,
  joinCommunity,
} from "../controllers/community.js";

const router = express.Router();

router.get("/search", [auth], getCommunityByName);
router.get("/getUser", [auth], getUserCommunities);
router.post("/create", [auth], createCommunity);
router.get("/getAll", [auth], getCommunities);
router.get("/get", [auth], getCommunity);
router.get("/posts", [auth], getCommunityPosts);
// router.patch("/join", [auth], joinCommunity);

export default router;