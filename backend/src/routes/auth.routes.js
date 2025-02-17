import express from "express";
import { registerStudent, loginUser, logoutUser, updateProfile } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected Route Example (can include role-based permissions if needed)
router.get("/protected-route", verifyToken, (req, res) => {
    res.json({ message: "This is a protected route", user: req.user });
});

// Staff Dashboard Route (role-based authorization)
router.get("/staff-dashboard", verifyToken, authorizeRoles("staff"), (req, res) => {
    res.json({ message: "Welcome to the Staff Dashboard", user: req.user });
});

// Student Registration Route
router.post(
    "/register", 
    registerStudent
);

// Login for Student, Staff, and TPO
router.post(
    "/login", 
    loginUser
);

// Logout Route (Protected)
router.delete(
    "/logout", 
    verifyToken, 
    logoutUser
);


// Route for updating user profile
router.put(
    "/profile",
    verifyToken,
    updateProfile
);


export default router;
