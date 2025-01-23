import express from "express";
import { createUser } from "../controllers/admin.controller.js";

const router = express.Router();

// Only Admin can create Staff & TPO users
router.post(
    "/admin/create-user",
    createUser
);

export default router;
