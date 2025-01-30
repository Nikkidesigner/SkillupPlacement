//TODO: make an admin create controller and enable checks of admin 

import { User } from "../models/User.model.js";
import { Staff } from "../models/Staff.model.js";
import { TPO } from "../models/TPO.model.js";
import bcrypt from "bcryptjs";

/**
 * @desc Create a Staff user (Admin only)
 * @route POST /api/v1/admin/create-staff
 * @access Admin
 */
export const createStaff = async (req, res) => {
    try {
        const { username, email, password, department } = req.body;

        // Validate input
        if (!username || !email || !password || !department) {
            return res.status(400).json({ message: "All fields are required (username, email, password, department)." });
        }

        // Check if user is Admin
        // if (req.user.role !== "admin") {
        //     return res.status(403).json({ message: "Access denied. Only Admin can create Staff users." });
        // }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // Hash password
        //const hashedPassword = await bcrypt.hash(password, 10);

        // Create Staff user
        const newUser = await User.create({
            username,
            email,
            password,
            role: "staff"
        });

        // Create Staff profile
        await Staff.create({
            userId: newUser._id,
            department
        });

        res.status(201).json({
            message: "Staff user created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                department
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating Staff user", error: error.message });
    }
};


export const createTPO = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required (username, email, password)." });
        }

        // Check if user is Admin
        // if (req.user.role !== "admin") {
        //     return res.status(403).json({ message: "Access denied. Only Admin can create TPO users." });
        // }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // Hash password
        //const hashedPassword = await bcrypt.hash(password, 10);

        // Create TPO user
        const newUser = await User.create({
            username,
            email,
            password,
            role: "tpo"
        });

        // Create TPO profile
        await TPO.create({
            userId: newUser._id
        });

        res.status(201).json({
            message: "TPO user created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating TPO user", error: error.message });
    }
};