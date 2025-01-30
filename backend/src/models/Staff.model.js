import mongoose, { Schema } from "mongoose";

const staffSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        department: {
            type: String,
            required: true,
            trim: true
        },
        createdExams: [
            {
                type: Schema.Types.ObjectId,
                ref: "Exam" // Exams created by this staff member
            }
        ],
        notifications: [
            {
                type: Schema.Types.ObjectId,
                ref: "Notification"
            }
        ]
    },
    { timestamps: true }
);

export const Staff = mongoose.model("Staff", staffSchema);
