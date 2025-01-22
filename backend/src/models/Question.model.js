import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
    {
        examId: {
            type: Schema.Types.ObjectId,
            ref: "Exam", // Assuming you have an "Exam" model
            required: true
        },
        questionText: {
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ["Aptitude", "Technical", "C", "C++", "Java", "Python", "DBMS", "Networking"],
            required: true
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
                type: String,
                required: false // Optional field for attachments (e.g., image or file URLs)
            }
        ]
    },
    { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
