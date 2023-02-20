import express from "express";
import {
    addPost,
    deletePost,
    getPost,
    getPosts,
    updatePost,
    getRandomPostId,
} from "../controllers/postController.js";

import { verifyToken } from "../middleware/authHandler.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/random", getRandomPostId);
router.get("/:id", getPost);
router.post("/", verifyToken, addPost);
router.delete("/:id", verifyToken, deletePost);
router.put("/:id", verifyToken, updatePost);

export default router;
