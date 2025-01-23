import mongoose, { Schema } from "mongoose";

const placementEventSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }, 
        link: {
            type: String,
            lowercase: true
        }, 
        date: {
            type: Date,
            required: true
        },
    },
    { timestamps: true }
);

export const PlacementEvent = mongoose.model("PlacementEvent", placementEventSchema);
