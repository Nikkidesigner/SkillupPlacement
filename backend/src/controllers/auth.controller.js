import { User } from "../models/User.model.js";
import { Student } from "../models/Student.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

export const registerStudent = asyncHandler(async (req, res) => {
    const { username, email, password, department, year, phone } = req.body;

    // Validate input
    if ( !username || !email || !password || !department || !year || !phone) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check if student already exists (email and phone must be unique)
    const existingUser = await User.findOne({ 
        $and: [
            { email },
        ]
    });
    if (existingUser) {
        return res.status(400).json({ message: "Email or Phone already in use" });
    }
    
    const existingStudent = await Student.findOne({ phone });
    if (existingStudent) {
        return res.status(400).json({ message: "Phone number already in use" });
    }

    // Create User (role: student)
    const newUser = await User.create({
        username,
        email,
        password,
        role: "student"
    });

    // Create Student Profile
    await Student.create({
        userId: newUser._id,
        department,
        year,
        phone
    });

    // Generate JWT Token
    const accessToken = newUser.generateAccessToken();

    // Add the token to the user's tokens array
    try {
         await newUser.addToken(token);
    } catch (error) {
        console.error("Error adding token in registration:", error);
    }
    

    res.status(201).json({
        message: "Student registered successfully",
        user: newUser,
        token: accessToken
    });
});


export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and Password are required" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    console.log('User:', user); // Debugging line
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // Debugging line
    console.log('User Password:', user.password);  // Debugging line
    console.log('Input Password:', password);      // Debugging line

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const accessToken = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    // Add the token to the user's tokens array
    try {
          await user.addToken(accessToken)
    } catch (error) {
        console.error("Error adding token in login:", error);
    }
    

    res.status(200).json({
        message: "Login successful",
        user: { id: user._id, username: user.username, email: user.email, role: user.role },
        token: accessToken
    });
});



export const logoutUser = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const token = req.token;

    await User.findByIdAndUpdate(userId, {
        $pull: { tokens: token }
    });

    res.status(200).json({ message: "Logged out successfully." });
});



/**
 * @desc Update user profile
 * @route PUT /api/v1/profile
 * @access Authenticated users
 */
export const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const { email, password, profilePicture } = req.body;

    // Validate input
    if (!email && !password && !profilePicture) {
        return res.status(400).json({ message: "At least one field (email, password, profilePicture) is required to update." });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (email) user.email = email;
    if (password) user.password = password; // Ensure password is hashed in the model
    if (profilePicture) user.profilePicture = profilePicture;

    // Save the updated user
    await user.save();

    res.status(200).json({
        message: "Profile updated successfully",
        user: {
            id: user._id,
            email: user.email,
            profilePicture: user.profilePicture
        }
    });
});