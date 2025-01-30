import { Question } from "../models/Question.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * @desc Admin can add a standalone question to the database
 * @route POST /api/v1/admin/questions
 * @access Admin only
 */
export const addQuestion = asyncHandler(async (req, res) => {
    const { questionText, category, subCategory, department, options, correctAnswer, difficulty, attachments } = req.body;

    // Check if user is Admin
    // FIXME: if (req.user.role !== "admin") {
    //     return res.status(403).json({ message: "Access denied. Only Admin can add questions." });
    // }

    // Validate required fields
    if (!questionText || !category || !subCategory || !options || !correctAnswer || !difficulty) {
        return res.status(400).json({ message: "All fields are required." });
    }

    // Ensure category is either "Aptitude" or "Technical"
    if (!["Aptitude", "Technical"].includes(category)) {
        return res.status(400).json({ message: "Invalid category. Choose either 'Aptitude' or 'Technical'." });
    }

    // Validate subCategory based on category
    const validAptitudeSubCategories = ["Quantitative", "Verbal", "Logical"];
    if (category === "Aptitude" && !validAptitudeSubCategories.includes(subCategory)) {
        return res.status(400).json({ message: "Invalid subCategory for Aptitude." });
    }

    // If category is Technical, ensure department is provided
    if (category === "Technical" && !department) {
        return res.status(400).json({ message: "Department is required for Technical category." });
    }

    // Create the question
    const newQuestion = await Question.create({
        questionText,
        category,
        subCategory,
        department: category === "Technical" ? department : null,
        options,
        correctAnswer,
        difficulty,
        attachments,
        usedInExam: false
    });

    res.status(201).json({
        message: "Question added successfully",
        question: newQuestion
    });
});

/**
 * @desc Get questions by category and optional sub-category
 * @route GET /api/v1/questions/category/:category
 * @access Public (Requires Authentication)
 */
export const getQuestionsByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;
    const { subCategory, department } = req.query; // Optional filters

    // Ensure valid category
    if (!["Aptitude", "Technical"].includes(category)) {
        return res.status(400).json({ message: "Invalid category. Choose either 'Aptitude' or 'Technical'." });
    }

    let query = { category };

    // Apply sub-category filter for Aptitude
    if (category === "Aptitude" && subCategory) {
        const validAptitudeSubCategories = ["Quantitative", "Verbal", "Logical"];
        if (!validAptitudeSubCategories.includes(subCategory)) {
            return res.status(400).json({ message: "Invalid subCategory for Aptitude." });
        }
        query.subCategory = subCategory;
    }

    // Apply department filter for Technical
    if (category === "Technical" && department) {
        query.department = department;
    }

    const questions = await Question.find(query).sort({ createdAt: -1 });

    res.status(200).json({ message: `Questions for category: ${category}`, questions });
});


/**
 * @desc Delete a question (Admin only)
 * @route DELETE /api/v1/admin/questions/:id
 * @access Admin only
 */
export const deleteQuestion = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Check if user is Admin
    // FIXME: if (req.user.role !== "admin") {
    //     return res.status(403).json({ message: "Access denied. Only Admin can delete questions." });
    // }

    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
        return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
});
