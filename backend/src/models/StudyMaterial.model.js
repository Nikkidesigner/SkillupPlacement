import mongoose, { Schema } from "mongoose";

const studyMaterialSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        uploadedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        fileUrl: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ["video", "pdf", "link"],
            required: true
        }
    },
    { timestamps: true }
);

export const StudyMaterial = mongoose.model("StudyMaterial", studyMaterialSchema);
