import mongoose, { Schema } from "mongoose";

const examResultSchema = new Schema(
    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: "Student", // Assuming you have a "Student" model
            required: true
        },
        examId: {
            type: Schema.Types.ObjectId,
            ref: "Exam", // Assuming you have an "Exam" model
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        answers: [
            {
                questionId: {
                    type: Schema.Types.ObjectId,
                    ref: "Question", // Assuming you have a "Question" model
                    required: true
                },
                selectedAnswer: {
                    type: String,
                    required: true
                },
                isCorrect: {
                    type: Boolean,
                    required: true
                }
            }
        ],
        attemptDate: {
            type: Date,
            required: true
        },
        rank: {
            type: Number,
            required: false // Optional field for rank (if applicable)
        }
    },
    { timestamps: true }
);

export const ExamResult = mongoose.model("ExamResult", examResultSchema);
