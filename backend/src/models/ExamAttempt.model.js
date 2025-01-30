import mongoose, { Schema } from "mongoose";

const examAttemptSchema = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: "User", // References the Student who attempted the exam
            required: true
        },
        examId: {
            type: Schema.Types.ObjectId,
            ref: "Exam", // References the Exam
            required: true
        },
        responses: [
            {
                questionId: {
                    type: Schema.Types.ObjectId,
                    ref: "Question", // References the Question
                    required: true
                },
                selectedOption: {
                    type: String,
                    required: true
                },
                isCorrect: {
                    type: Boolean
                }
            }
        ],
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date
        },
        submitted: {
            type: Boolean,
            default: false // Indicates whether the exam was submitted
        },
        score: {
            type: Number,
            default: 0 // Final score, calculated after submission
        }
    },
    { timestamps: true }
);

export const ExamAttempt = mongoose.model("ExamAttempt", examAttemptSchema);
