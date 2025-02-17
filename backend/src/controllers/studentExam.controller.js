import { Exam } from "../models/Exam.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ExamAttempt } from "../models/ExamAttempt.model.js";
import { Student } from "../models/Student.model.js";

/**
 * @desc Get upcoming exams for a student
 * @route GET /api/v1/students/exams
 * @access Student only
 */
export const getStudentExams = asyncHandler(async (req, res) => {
    // Ensure user is a student
    if (req.user.role !== "student") {
        return res.status(403).json({ message: "Access denied. Only students can view exams." });
    }

    // Get student's department
    const studentDepartment = req.user.department;
    if (!studentDepartment) {
        return res.status(400).json({ message: "Department not found. Ensure student profile has a department." });
    }

    // Fetch exams (Technical - Same Dept, Aptitude - All Students)
    const exams = await Exam.find({
        $or: [
            { category: "Aptitude" }, // Aptitude exams for all students
            { category: "Technical", department: { $eq: studentDepartment } } // Technical exams for matching department
        ],
        scheduledDate: { $gte: new Date().toISOString() } // Only fetch future exams
    })
    .select('title category department createdBy duration scheduledDate') // Only select specified fields
    .sort({ scheduledDate: 1 }) // Sort by upcoming dates
    .lean();

    res.status(200).json({ message: "Upcoming exams", exams });
});

export const startExam = asyncHandler(async (req, res) => {
    const { examId } = req.body;
    const studentId = req.user.userId; // User ID from the token

    // Find the exam by ID
    const exam = await Exam.findById(examId);
    if (!exam) {
        return res.status(404).json({ message: "Exam not found." });
    }

    // Check if the exam is ongoing
    if (exam.status !== "ongoing") {
        return res.status(400).json({ message: "Exam is not available at this time." });
    }

    // Check if the student is from the correct department (only for technical exams)
    if (exam.category === "Technical") {
        const student = await Student.findOne({ userId: studentId });
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        // Ensure the student's department matches the exam's department
        if (student.department !== exam.department) {
            return res.status(400).json({ message: `You are not eligible for this exam.` });
        }
    }

    // Create a new exam attempt for the student
    const newAttempt = await ExamAttempt.create({
        studentId,
        examId,
        startTime: new Date(),
    });

    // Add the exam attempt to the student's registered exams
    await Student.findByIdAndUpdate(studentId, {
        $push: { examAttempts: newAttempt._id }
    });

    res.status(201).json({
        message: "Exam started successfully.",
        exam: {
            id: exam._id,
            title: exam.title,
            scheduledDate: exam.scheduledDate,
        },
        attemptId: newAttempt._id
    });
});
