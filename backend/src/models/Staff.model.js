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
        assignedExams: [
            {
                type: Schema.Types.ObjectId,
                ref: "Exam"
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