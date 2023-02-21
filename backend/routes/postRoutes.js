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
import { upload as multerUpload } from "../fileHandling.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/random", getRandomPostId);
router.get("/:id", getPost);
router.post("/", [multerUpload.single("image"), verifyToken], addPost);
router.delete("/:id", verifyToken, deletePost);
router.put("/:id", [multerUpload.single("image"), verifyToken], updatePost);

export default router;
