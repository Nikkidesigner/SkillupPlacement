import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
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
        year: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        registeredExams: [
            {
                type: Schema.Types.ObjectId,
                ref: "Exam" // Exams the student is assigned to
            }
        ],
        examAttempts: [
            {
                type: Schema.Types.ObjectId,
                ref: "ExamAttempt" // References the student's attempts
            }
        ],
        studyMaterials: [
            {
                type: Schema.Types.ObjectId,
                ref: "StudyMaterial"
            }
        ]
    },
    { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);
