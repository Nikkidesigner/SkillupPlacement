import cron from "node-cron";
import { Exam } from "../models/Exam.model.js";

// This cron job will run every minute (you can adjust the frequency)
cron.schedule("* * * * *", async () => {
    try {
        const currentDate = new Date();
        console.log("Cron job running at:", currentDate); // Log cron job execution time

        // Update exam status from "upcoming" to "ongoing" if the scheduled date has passed
        const ongoingExams = await Exam.updateMany(
            { scheduledDate: { $lte: currentDate }, status: "upcoming" },
            { $set: { status: "ongoing" } }
        );
        console.log(`Updated ${ongoingExams.modifiedCount} exams to 'ongoing'`);

        // Update exam status from "ongoing" to "completed" if the scheduled date + duration has passed
        const completedExams = await Exam.updateMany(
            { scheduledDate: { $lte: currentDate }, status: "ongoing" },
            { $set: { status: "completed" } }
        );
        console.log(`Updated ${completedExams.modifiedCount} exams to 'completed'`);

    } catch (error) {
        console.error("Error updating exam statuses:", error);
    }
});
