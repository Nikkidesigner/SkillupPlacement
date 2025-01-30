import express from "express";
import { createExam } from "../controllers/exam.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Staff & TPO can create exams
router.post("/exams", verifyToken, authorizeRoles("staff", "tpo"), createExam);

export default router;
