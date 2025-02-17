import { StudyMaterial } from "../models/StudyMaterial.model.js";
import { uploadOnCloudinary } from "../middlewares/cloudinary.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * @desc Upload study material
 * @route POST /api/v1/study-materials
 * @access Staff & TPO
 */
export const uploadStudyMaterial = asyncHandler(async (req, res) => {
    const { title, category, type } = req.body;
    const uploadedBy = req.user.userId;

    // Validate input
    if (!title || !category || !type) {
        return res.status(400).json({ message: "Title, category, and type are required." });
    }

    let fileUrl = null;

    // Handle file upload if a file is provided
    if (req.file) {
        const uploadResult = await uploadOnCloudinary(req.file.path);
        if (!uploadResult) {
            return res.status(500).json({ message: "Failed to upload file to Cloudinary." });
        }
        fileUrl = uploadResult.secure_url;
    }

    // Create study material entry in the database
    const newStudyMaterial = await StudyMaterial.create({
        title,
        category,
        uploadedBy,
        fileUrl,
        type
    });

    res.status(201).json({
        message: "Study material uploaded successfully",
        studyMaterial: newStudyMaterial
    });
});


/**
 * @desc Get study materials for students
 * @route GET /api/v1/study-materials
 * @access Student only
 */
export const getStudyMaterials = asyncHandler(async (req, res) => {
    // Fetch all study materials from the database
    const studyMaterials = await StudyMaterial.find().populate('uploadedBy', 'username');

    res.status(200).json({
        message: "Study materials retrieved successfully",
        studyMaterials
    });
});


/**
 * @desc Delete study material
 * @route DELETE /api/v1/study-materials/:id
 * @access Staff & TPO
 */
export const deleteStudyMaterial = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Find and delete the study material by ID
    const deletedMaterial = await StudyMaterial.findByIdAndDelete(id);

    if (!deletedMaterial) {
        return res.status(404).json({ message: "Study material not found" });
    }

    res.status(200).json({ message: "Study material deleted successfully" });
});
