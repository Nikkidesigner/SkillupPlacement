import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// CORS middleware configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

// Parse incoming request data
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files (e.g., images, stylesheets, etc.)
app.use(express.static("public"));

// Parse cookies from incoming requests
app.use(cookieParser());

// Root route with fixed HTML structure
app.get("/", (req, res) => {
    res.send("<h1>SkillUpPlacement</h1>");
});

// Routes import
import authRouter from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import questionRoutes from "./routes/question.routes.js";
import examRoutes from "./routes/exam.routes.js";
import studentExamRoutes from "./routes/studentExam.routes.js";
import studyMaterialRoutes from "./routes/studyMaterial.routes.js"; // Import study material routes

// Routes Use
app.use("/api/v1/auth", authRouter);
app.use("/api/v1", notificationRoutes);
app.use("/api/v1", adminRoutes);
app.use("/api/v1", questionRoutes);
app.use("/api/v1", examRoutes);
app.use("/api/v1", studentExamRoutes);
app.use("/api/v1", studyMaterialRoutes); // Use study material routes

// Global error-handling middleware (should be placed after all routes)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "error",
        message: err.message || "Something went wrong!",
    });
});

export default app; // No app.listen here
