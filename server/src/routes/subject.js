import express from "express";
import {
  createSubject,
  getSubjects,
  searchSubjectAndTeachers,
  getSubjectFromId,
} from "../controllers/subject.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", [auth], createSubject);
router.get("/list", [auth], getSubjects);
router.get("/getSubject", [auth], getSubjectFromId);
router.get("/bestTeachers", [auth], searchSubjectAndTeachers);

export default router;