import express from "express";
import { auth } from "../middleware/auth.js";

import { createSlot, getSlot } from "../controllers/slot.js";

const router = express.Router();

router.get("/getSlot", [auth], getSlot);
router.post("/create", [auth], createSlot);

export default router;