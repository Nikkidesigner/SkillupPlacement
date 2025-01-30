// TODO:: make admin route and enable comment

import express from "express";
import  {addQuestion, getQuestionsByCategory, deleteQuestion} from "../controllers/question.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

//Admin Only:
// Only Admin can add questions
router.post(
    "/admin/questions",
    verifyToken, 
    //authorizeRoles("admin"), 
    addQuestion
);
router.delete(
    "/admin/questions/:id", 
    verifyToken, 
    authorizeRoles(
        "staff", 
        "tpo", 
        //FIXME:"admin"
    ),
    deleteQuestion
);


// Get questions by category (All authenticated users)
router.get(
    "/questions/category/:category", 
    verifyToken, 
    authorizeRoles(
        "staff", 
        "tpo", 
        //FIXME:"admin"
    ),
    getQuestionsByCategory
);

export default router;
