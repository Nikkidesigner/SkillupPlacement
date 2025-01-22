import mongoose, { Schema } from "mongoose";

const tpoSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        notifications: [
            {
                type: Schema.Types.ObjectId,
                ref: "Notification"
            }
        ],
        placementEvents: [
            {
                type: Schema.Types.ObjectId,
                ref: "PlacementEvent"
            }
        ]
    },
    { timestamps: true }
);

export const TPO = mongoose.model("TPO", tpoSchema);
