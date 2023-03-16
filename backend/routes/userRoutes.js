import express from "express";
import { getUser, getUserPost, changePassword } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authHandler.js";

const router = express.Router();

router.get("/post/:id", getUserPost);
router.get("/:id", getUser);
router.post("/changePassword", verifyToken, changePassword);

export default router;
