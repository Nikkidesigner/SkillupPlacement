import express from "express";
import { createStaff, createTPO } from "../controllers/admin.controller.js";
//TODO:import { verifyToken } from "../middlewares/auth.middleware.js";
//TODO:import { authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Admin can create Staff & TPO
router.post(
    "/admin/create-staff", 
    //FIXME:verifyToken, 
    //FIXME:authorizeRoles("admin"), 
    createStaff
);

router.post(
    "/admin/create-tpo", 
    //FIXME:verifyToken, 
    //FIXME:authorizeRoles("admin"), 
    createTPO
);

export default router;
