import mongoose, { Schema } from "mongoose";

const examResultSchema = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: "User", // Reference to User instead of Student model
            required: true
        },
        examId: {
            type: Schema.Types.ObjectId,
            ref: "Exam",
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        correctAnswers: {
            type: Number, // Count of correct answers
            required: true
        },
        totalQuestions: {
            type: Number, // Total number of questions in the exam
            required: true
        },
        attemptDate: {
            type: Date,
            default: Date.now
        },
        rank: {
            type: Number // Optional field for ranking
        }
    },
    { timestamps: true }
);

export const ExamResult = mongoose.model("ExamResult", examResultSchema);
