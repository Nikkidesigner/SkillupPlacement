import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";
import { Student } from "../models/Student.model.js"; // Import Student model

export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access denied, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("Decoded token:", decoded);
        
        const user = await User.findById(decoded.userId);
        console.log("User tokens:", user?.tokens);

        if (!user || !user.tokens?.includes(token)) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        // Set req.user with basic details
        req.user = {
            userId: user._id,
            role: user.role,
            department: null // Default to null (updated below for students)
        };

        // **✅ Fetch department if user is a Student**
        if (user.role === "student") {
            const studentProfile = await Student.findOne({ userId: user._id });
            if (studentProfile) {
                req.user.department = studentProfile.department;
            } else {
                console.log("⚠ Warning: Student profile not found!");
            }
        }

        req.token = token;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied: Unauthorized role" });
        }
        next();
    };
};
