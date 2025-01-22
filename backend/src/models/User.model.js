import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["student", "staff", "tpo", "admin"],
            required: true
        },
        profilePicture: {
            type: String,
            default: ""
        },
        tokens: [
            { 
                type: String 
            }
        ],
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
    next();
});

// Compare passwords for login
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcryptjs.compare(password, this.password);
};

// Generate JWT Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { userId: this._id, role: this.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

// Store Token on Login
userSchema.methods.addToken = async function (token) {
    console.log('Token being added:', token);
    this.tokens.push(token);
    console.log('Tokens before save:', this.tokens);
    await this.save();
};


export const User = mongoose.model("User", userSchema);
