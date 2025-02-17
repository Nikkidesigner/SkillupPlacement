import express from "express";
import { createStaff, createTPO, createAdmin, deleteUser} from "../controllers/admin.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Creating a admin User
router.post(
    "/admin/create-admin",
    createAdmin
)

// Admin can create Staff & TPO
router.post(
    "/admin/create-staff", 
    verifyToken, 
    authorizeRoles("admin"), 
    createStaff
);

router.post(
    "/admin/create-tpo", 
    verifyToken, 
    authorizeRoles("admin"), 
    createTPO
);

// Route for deleting a user
router.delete(
    "/admin/users/:id",
    verifyToken,
    authorizeRoles("admin"), // Assuming only admins can delete users
    deleteUser
);

export default router;
