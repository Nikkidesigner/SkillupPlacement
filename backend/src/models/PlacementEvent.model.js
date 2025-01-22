import mongoose, { Schema } from "mongoose";

const placementEventSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        company: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        eligibilityCriteria: {
            type: String,
            required: true
        },
        registeredStudents: [
            {
                type: Schema.Types.ObjectId,
                ref: "Student" // Assuming you have a "Student" model
            }
        ]
    },
    { timestamps: true }
);

export const PlacementEvent = mongoose.model("PlacementEvent", placementEventSchema);
