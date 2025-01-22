import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
    {
        message: {
            type: String,
            required: true
        },
        targetRole: {
            type: String,
            enum: ["student", "staff", "tpo", "admin"],
            required: true
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User", // Assuming you have a "User" model for the creator of the notification
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
