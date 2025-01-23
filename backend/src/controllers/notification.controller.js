import { Notification } from "../models/Notification.model.js";
import { PlacementEvent } from "../models/PlacementEvent.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"; // Assuming this is the correct path

/**
 * @desc Send a regular notification (Only Staff & TPO)
 * @route POST /api/v1/notifications
 * @access Staff, TPO
 */
export const sendNotification = asyncHandler(async (req, res) => {
    const { title, message } = req.body;

    // Check if user is Staff or TPO
    if (req.user.role !== "staff" && req.user.role !== "tpo") {
        return res.status(403).json({ message: "Access denied. Only Staff & TPO can send notifications." });
    }

    // Create Regular Notification
    const notification = await Notification.create({
        title,
        message,
        createdBy: req.user.userId
    });

    res.status(201).json({
        message: "Notification sent successfully",
        notification
    });
});

/**
 * @desc Send a placement event notification (Only TPO)
 * @route POST /api/v1/placement-events
 * @access TPO only
 */
export const sendPlacementEvent = asyncHandler(async (req, res) => {
    const { title, description, link, date } = req.body;

    // Only TPO can send placement notifications
    if (req.user.role !== "tpo") {
        return res.status(403).json({ message: "Access denied. Only TPO can send placement notifications." });
    }

    // Create Placement Event
    const placementEvent = await PlacementEvent.create({
        title,
        description,
        link,
        date
    });

    res.status(201).json({
        message: "Placement event created successfully",
        placementEvent
    });
});


export const getNotifications = async (req, res) => {
    try {
        // Fetch regular notifications
        const notifications = await Notification.find()
            .populate("createdBy", "username email role") // Populate sender details
            .sort({ createdAt: -1 }); // Sort by newest first

        // Fetch placement event notifications
        const placementEvents = await PlacementEvent.find()
            .sort({ createdAt: -1 }); // Sort by newest first

        // Combine both lists and sort again (just to be safe)
        const allNotifications = [...notifications, ...placementEvents].sort(
            (a, b) => b.createdAt - a.createdAt
        );

        res.status(200).json({
            message: "Notifications fetched successfully",
            notifications: allNotifications
        });

    } catch (error) {
        res.status(500).json({ message: "Error fetching notifications", error: error.message });
    }
};