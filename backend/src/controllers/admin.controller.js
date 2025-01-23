import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";

/**
 * @desc Create a Staff or TPO user (Admin only)
 * @route POST /api/v1/admin/create-user
 * @access Admin
 */
export const createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validate input
        if (!username || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Only Admin can add Staff or TPO
        // if (req.user.role !== "admin") {
        //     return res.status(403).json({ message: "Access denied. Only Admin can create users." });
        // }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // Allowed roles
        const allowedRoles = ["staff", "tpo"];
        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role. Only 'staff' or 'tpo' can be created." });
        }

        // Hash password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            username,
            email,
            password,
            role
        });

        res.status(201).json({
            message: `${role} user created successfully`,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
    }
};
