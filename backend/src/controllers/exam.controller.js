import { Exam } from "../models/Exam.model.js";
import { Question } from "../models/Question.model.js";
import { Staff } from "../models/Staff.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

    res.status(201).json({ message: "Exam created successfully", exam: newExam });
});
