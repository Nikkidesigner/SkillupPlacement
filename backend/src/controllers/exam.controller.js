import { Exam } from "../models/Exam.model.js";
import { Question } from "../models/Question.model.js";
import { Staff } from "../models/Staff.model.js";
import { TPO } from "../models/TPO.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ExamAttempt } from "../models/ExamAttempt.model.js";
import { ExamResult } from "../models/ExamResult.model.js";


/**
 * @desc Create an Exam (Staff for Technical, TPO for Aptitude)
 * @route POST /api/v1/exams
 * @access Staff & TPO
 */
export const createExam = asyncHandler(async (req, res) => {
    const { title, category, scheduledDate } = req.body;

    // Ensure only Staff & TPO can create exams
    if (!["staff", "tpo"].includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied. Only Staff & TPO can create exams." });
    }

    // Validate inputs
    if (!title || !category || !scheduledDate) {
        return res.status(400).json({ message: "All fields (title, category, scheduledDate) are required." });
    }

    // Ensure valid category
    if (!["Aptitude", "Technical"].includes(category)) {
        return res.status(400).json({ message: "Invalid category. Choose either 'Aptitude' or 'Technical'." });
    }

    let questions = [];
    let department = null; // To store staff department

    if (category === "Aptitude" && req.user.role === "tpo") {
        // Fetch 10 Quantitative, 10 Verbal, 10 Logical questions
        const quantitative = await Question.find({ category: "Aptitude", subCategory: "Quantitative", usedInExam: false })
            .limit(10);
        const verbal = await Question.find({ category: "Aptitude", subCategory: "Verbal", usedInExam: false })
            .limit(10);
        const logical = await Question.find({ category: "Aptitude", subCategory: "Logical", usedInExam: false })
            .limit(10);

        questions = [...quantitative, ...verbal, ...logical];
    } else if (category === "Technical" && req.user.role === "staff") {
        // Fetch the Staff's department from the Staff model
        const staff = await Staff.findOne({ userId: req.user.userId });
        if (!staff || !staff.department) {
            return res.status(400).json({ message: "Staff department is required for Technical exams." });
        }
        department = staff.department; // Store department

        // Fetch 10 Easy, 10 Medium, 10 Hard questions based on Staff's department
        const easy = await Question.find({ category: "Technical", department, difficulty: "easy", usedInExam: false })
            .limit(10);
        const medium = await Question.find({ category: "Technical", department, difficulty: "medium", usedInExam: false })
            .limit(10);
        const hard = await Question.find({ category: "Technical", department, difficulty: "hard", usedInExam: false })
            .limit(10);

        questions = [...easy, ...medium, ...hard];
    } else {
        return res.status(403).json({ message: "Invalid category for your role." });
    }

    // Ensure 30 questions were selected
    if (questions.length !== 30) {
        return res.status(400).json({ message: "Not enough questions available for this category." });
    }

    // Mark questions as used
    const questionIds = questions.map((q) => q._id);
    await Question.updateMany({ _id: { $in: questionIds } }, { $set: { usedInExam: true } });

    // Create the Exam
    const newExam = await Exam.create({
        title,
        category,
        department: category === "Technical" ? department : null,
        createdBy: req.user.userId,
        scheduledDate,
        duration: 45,
        passingScore: 50, // Default passing score (can be adjusted)
        questions: questionIds,
        status: "upcoming"
    });

    // **✅ Update Staff or TPO Model**
    if (req.user.role === "staff") {
        await Staff.findOneAndUpdate(
            { userId: req.user.userId },
            { $push: { createdExams: newExam._id } }
        );
    } else if (req.user.role === "tpo") {
        await TPO.findOneAndUpdate(
            { userId: req.user.userId },
            { $push: { createdExams: newExam._id } }
        );
    }

    res.status(201).json({ message: "Exam created successfully", exam: newExam });
});


/**
 * @desc Submit an Exam (after attempting)
 * @route POST /api/v1/exams/submit
 * @access Student only
 */
export const submitExam = asyncHandler(async (req, res) => {
    const { examId, responses } = req.body; // responses should include the questionId, selectedOption

    // Ensure the student is the one who attempted the exam
    const examAttempt = await ExamAttempt.findOne({ studentId: req.user.userId, examId });

    if (!examAttempt) {
        return res.status(404).json({ message: "Exam attempt not found." });
    }

    // Check if the exam has already been submitted
    if (examAttempt.submitted) {
        return res.status(400).json({ message: "You have already submitted this exam." });
    }

    // Mark the exam attempt as submitted
    examAttempt.submitted = true;
    examAttempt.endTime = new Date(); // Set the end time when the exam is submitted
    await examAttempt.save();

    // Calculate the score based on the responses
    let correctAnswers = 0;
    let totalQuestions = examAttempt.responses.length;

    for (let i = 0; i < responses.length; i++) {
        const response = responses[i];
        const question = await Question.findById(response.questionId);
        
        // Compare selected option with the correct answer
        if (question.correctAnswer === response.selectedOption) {
            correctAnswers++;
        }

        // Update the response with whether the selected answer was correct
        const responseInAttempt = examAttempt.responses.find(
            (r) => r.questionId.toString() === response.questionId
        );
        responseInAttempt.isCorrect = question.correctAnswer === response.selectedOption;
    }

    // Calculate the final score (you can customize this calculation as needed)
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    // Save the result to the ExamResult model
    const examResult = new ExamResult({
        studentId: req.user.userId,
        examId,
        score,
        correctAnswers,
        totalQuestions,
    });

    await examResult.save();

    res.status(200).json({
        message: "Exam submitted successfully",
        result: {
            score,
            correctAnswers,
            totalQuestions,
        },
    });
});


/**
 * @desc Get All Exam Results for a Student
 * @route GET /api/v1/students/exams/results
 * @access Student only
 */
export const getAllExamResults = asyncHandler(async (req, res) => {
    const studentId = req.user.userId;

    // Find all exam results for the student, sorted by attempt date (newest first)
    const examResults = await ExamResult.find({ studentId })
        .sort({ attemptDate: -1 }); // Sort by attemptDate in descending order

    if (!examResults.length) {
        return res.status(404).json({ message: "No exam results found." });
    }

    res.status(200).json({
        message: "Exam results retrieved successfully",
        results: examResults
    });
});


/**
 * @desc Publish Exam Results
 * @route POST /api/v1/exams/:examId/publish-results
 * @access Staff & TPO
 */
export const publishExamResults = asyncHandler(async (req, res) => {
    const { examId } = req.params;

    // Find the exam
    const exam = await Exam.findById(examId);

    if (!exam) {
        return res.status(404).json({ message: "Exam not found." });
    }

    // Check if the exam status is "completed"
    if (exam.status !== "completed") {
        return res.status(400).json({ message: "Results can only be published for completed exams." });
    }

    // Update the resultsPublished flag
    exam.resultsPublished = true;
    await exam.save();

    res.status(200).json({
        message: "Exam results published successfully",
        exam
    });
});