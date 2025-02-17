import { User } from "../models/User.model.js";
import { Staff } from "../models/Staff.model.js";
import { TPO } from "../models/TPO.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * @desc Create an Admin user
 * @route POST /api/v1/admin/create-admin
 * @access Superadmin
 */
export const createAdmin = asyncHandler(async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if ( !username || !email || !password ) {
            return res.status(400).json({ message: "All fields are required (username, email, password)." });
        }

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        const newUser = await User.create({
            username,
            email,
            password,
            role: "admin"
        });

        res.status(201).json({
            message: "admin user created successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Error creating admin user", error: error.message });
    }
});

/**
 * @desc Create a Staff user (Admin only)
 * @route POST /api/v1/admin/create-staff
 * @access Admin
 */
export const createStaff = asyncHandler(async (req, res) => {
    try {
        const { username, email, password, department } = req.body;

        // Validate input
        if ( !username || !email || !password || !department) {
            return res.status(400).json({ message: "All fields are required (username, email, password, department)." });
        }

        // Check if user is Admin
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Only Admin can create Staff users." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

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
});


export const createTPO = asyncHandler(async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input
        if ( !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required (username, email, password)." });
        }

        //Check if user is Admin
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Only Admin can create TPO users." });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }


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
});

/**
 * @desc Delete a user
 * @route DELETE /api/v1/admin/users/:id
 * @access Admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Check if user is Admin
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied. Only Admin can delete users." });
    }

    // Find and delete the user by ID
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
});
