import express from "express";
import { getStudentExams, startExam } from "../controllers/studentExam.controller.js";
import { submitExam, getAllExamResults } from "../controllers/exam.controller.js"; 
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Student can view assigned exams
router.get(
    "/students/exams", 
    verifyToken, 
    authorizeRoles("student"), 
    getStudentExams
);

// Student can start an exam
router.post(
    "/students/exams/start", 
    verifyToken, 
    authorizeRoles("student"), 
    startExam
);

// Student can submit an exam
router.post(
    "/students/exams/submit", 
    verifyToken, 
    authorizeRoles("student"), 
    submitExam
);


// Student can get all exam results
router.get(
    "/students/exams/results", 
    verifyToken, 
    authorizeRoles("student"), 
    getAllExamResults
);

export default router;
