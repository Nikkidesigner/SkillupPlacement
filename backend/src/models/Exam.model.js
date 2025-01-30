import mongoose, { Schema } from "mongoose";

const examSchema = new Schema(
    {
        title: {
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
            required: function () {
                return this.category === "Aptitude"; // Required for aptitude exams
            }
        },
        department: {
            type: String,
            required: function () {
                return this.category === "Technical"; // Required for technical exams
            }
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User", // The Staff or TPO who created the exam
            required: true
        },
        duration: {
            type: Number,
            default: 45, // Fixed exam duration
            required: true
        },
        passingScore: {
            type: Number,
            required: true
        },
        questions: [
            {
                type: Schema.Types.ObjectId,
                ref: "Question" // References the Question model
            }
        ],
        scheduledDate: {
            type: Date,
            required: true
        },
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: "User" // Students who attempt the exam
            }
        ],
        status: {
            type: String,
            enum: ["upcoming", "ongoing", "completed"],
            default: "upcoming",
            required: true
        },
        resultsPublished: {
            type: Boolean,
            default: false // Results will be manually published by Staff/TPO
        }
    },
    { timestamps: true }
);

export const Exam = mongoose.model("Exam", examSchema);
