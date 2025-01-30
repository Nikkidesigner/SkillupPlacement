import express from "express";
import { sendNotification, sendPlacementEvent, getNotifications} from "../controllers/notification.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Staff & TPO can send general notifications
router.post(
    "/notifications",
    verifyToken,
    authorizeRoles("staff", "tpo"),
    sendNotification
);

// Only TPO can send placement event notifications
router.post(
    "/placement-events",
    verifyToken,
    authorizeRoles("tpo"),
    sendPlacementEvent
);

router.get(
    "/notifications",
    verifyToken,
    getNotifications
);

export default router;
