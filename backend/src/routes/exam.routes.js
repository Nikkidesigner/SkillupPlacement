import express from "express";
import { createExam, publishExamResults } from "../controllers/exam.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Staff & TPO can create exams
router.post(
    "/exams", 
    verifyToken, 
    authorizeRoles("staff", "tpo"), 
    createExam
);

// Staff & TPO can publish exam results
router.post(
    "/exams/:examId/publish-results", 
    verifyToken, 
    authorizeRoles("staff", "tpo"), 
    publishExamResults
);

export default router;
