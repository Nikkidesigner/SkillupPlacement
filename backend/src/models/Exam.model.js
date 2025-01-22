import mongoose, { Schema } from "mongoose";

const examSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            
            required: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "Staff", // Assuming you have a "Staff" model
            required: true
        },
        duration: {
            type: Number,
            required: true // Duration in minutes
        },
        passingScore: {
            type: Number,
            required: true
        },
        questions: [
            {
                type: Schema.Types.ObjectId,
                ref: "Question" // Assuming you have a "Question" model
            }
        ],
        scheduledDate: {
            type: Date,
            required: true
        },
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: "Student" // Assuming you have a "Student" model
            }
        ],
        status: {
            type: String,
            enum: ["upcoming", "ongoing", "completed"],
            required: true
        }
    },
    { timestamps: true }
);

export const Exam = mongoose.model("Exam", examSchema);
