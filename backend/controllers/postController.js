import { db } from "../db.js";
import asyncHandler from "express-async-handler";

// @desc    Fetch all blog posts
// @route   GET /api/posts
// @access  Public
export const getPosts = asyncHandler(async (req, res) => {
    let category = req.query.cat;
    const q = category
        ? "SELECT * FROM posts WHERE category = ? ORDER BY date DESC"
        : "SELECT * FROM posts ORDER BY date DESC";

    if (category === undefined) category = null;
    const [data] = await db.execute(q, [category]);

    // Limiting character count of description
    data.forEach((post) => (post.desc = post.desc.substring(0, 200)));
    return res.status(200).json(data);
});

// @desc    Fetch a blog post
// @route   GET /api/posts/:id
// @access  Public
export const getPost = asyncHandler(async (req, res) => {
    const q =
        "SELECT posts.id, `username`, `title`, `desc`, posts.img, users.img AS userImg, `category`, `date` FROM users JOIN posts on users.id = posts.uid WHERE posts.id = ?";

    const [data] = await db.execute(q, [req.params.id]);

    if (data.length == 0) {
        res.status(404);
        throw new Error("The post ID is invalid or the post has been deleted.");
    }

    return res.status(200).json(data[0]);
});

// @desc    Add a new blog post to DB
// @route   POST /api/posts
// @access  Private
export const addPost = asyncHandler(async (req, res) => {
    const q =
        "INSERT INTO posts(`title`, `desc`, `img`, `category`, `date`, `uid`) VALUES (?, ?, ?, ?, ?, ?)";

    const body = req.body;

    if (!body.title || !body.desc || !body.img || !body.date) {
        res.status(422);
        throw new Error("One or more fields are missing.");
    }

    if (req.body.desc.length < 200 || req.body.title.length < 10) {
        res.status(400);
        throw new Error("The title or description is too short.");
    }

    const [data] = await db.execute(q, [
        body.title,
        body.desc,
        body.img,
        body.category,
        body.date,
        userInfo.id,
    ]);
    return res.status(201).json({
        message: "Published successfully",
        insertId: data.insertId,
    });
});

// @desc    Delete a blog post from DB
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req, res) => {
    const q = "DELETE FROM posts WHERE id = ? AND uid = ?";

    const [data] = await db.execute(q, [req.params.id, req.user.id]);
    res.json({ message: "The post has been deleted." });
});

// @desc    Update a blog post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;

    const q =
        "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `category` = ? WHERE id = ? AND uid = ?";

    const body = req.body;
    const values = [body.title, body.desc, body.img, body.category];

    if (!body.title || !body.desc || !body.img) {
        res.status(422);
        throw new Error("One or more fields are missing.");
    }

    await db.execute(q, [...values, postId, req.user.id]);

    return res.status(201).json({
        message: "The post has been successfully updated and published.",
        insertId: postId,
    });
});
