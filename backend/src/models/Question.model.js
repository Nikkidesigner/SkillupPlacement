import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
    {
        questionText: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ["Aptitude", "Technical"],
            required: true
        },
        subCategory: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: function () {
                return this.category === "Technical"; // Required only if category is Technical
            }
        },
        options: [
            {
                type: String,
                required: true
            }
        ],
        correctAnswer: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            required: true
        },
        attachments: [
            {
                type: String, // URLs of images or files
                required: false
            }
        ],
        usedInExam: {
            type: Boolean,
            default: false // Track if this question has been used
        }
    },
    { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
