import express from "express";
import { uploadStudyMaterial, getStudyMaterials, deleteStudyMaterial } from "../controllers/studyMaterial.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Staff & TPO can upload study materials
router.post(
    "/study-materials",
    verifyToken,
    authorizeRoles("staff", "tpo"),
    upload.single("file"), // Use multer to handle single file uploads
    uploadStudyMaterial
);

// Students can get study materials
router.get(
    "/study-materials",
    verifyToken,
    authorizeRoles("student"),
    getStudyMaterials
);

// Staff & TPO can delete study materials
router.delete(
    "/study-materials/:id",
    verifyToken,
    authorizeRoles("staff", "tpo"),
    deleteStudyMaterial
);

export default router;
