import { db } from "../db.js";
import asyncHandler from "express-async-handler";
import { uploadToCloudinary, deleteFromCloudinary } from "../fileHandling.js";

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

// @desc    Fetch a random blog post Id
// @route   GET /api/posts/random
// @access  Public
export const getRandomPostId = asyncHandler(async (req, res) => {
    const q = "SELECT id FROM posts ORDER BY RAND() LIMIT 1";

    const [data] = await db.execute(q);
    res.json({ postId: data[0].id });
});

// @desc    Add a new blog post to DB
// @route   POST /api/posts
// @access  Private
export const addPost = asyncHandler(async (req, res) => {
    const { title, desc, category } = req.body;
    const localFilePath = req?.file?.path;

    if (!title || !desc || !localFilePath || !category) {
        res.status(422);
        throw new Error("One or more fields are missing.");
    }

    const result = await uploadToCloudinary(localFilePath);

    const q = "INSERT INTO posts(`title`, `desc`, `img`, `category`, `uid`) VALUES (?, ?, ?, ?, ?)";

    if (desc.length < 200 || title.length < 10) {
        res.status(400);
        throw new Error("The title or description is too short.");
    }

    const [data] = await db.execute(q, [title, desc, result.url, category, req.user.id]);

    return res.status(201).json({
        message: "Published successfully",
        insertId: data.insertId,
    });
});

// @desc    Delete a blog post from DB
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req, res) => {
    const fetchPost = "SELECT uid, img FROM posts WHERE id = ?";
    const [data] = await db.execute(fetchPost, [req.params.id]);

    if (data.length == 0) {
        res.status(404);
        throw new Error("The post ID is invalid");
    }

    if (data[0].uid != req.user.id) {
        res.status(402);
        throw new Error("You are not authorized to perform this action.");
    }

    console.log(data[0].img);
    await deleteFromCloudinary(data[0].img);

    const q = "DELETE FROM posts WHERE id = ? AND uid = ?";
    await db.execute(q, [req.params.id, req.user.id]);
    res.json({ message: "The post has been deleted." });
});

// @desc    Update a blog post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req, res) => {
    const localFilePath = req?.file?.path;
    const { title, desc, category } = req.body;

    const postId = req.params.id;

    let image = req.body.image;
    if (localFilePath) {
        if (!title || !desc || !category) {
            res.status(422);
            throw new Error("One or more fields are missing.");
        }

        // First, delete the current image from the cloudinary.
        const fetchImageUrlQuery = "SELECT img FROM posts WHERE id = ?";
        const [data] = await db.execute(fetchImageUrlQuery, [postId]);
        await deleteFromCloudinary(data[0].img);

        image = (await uploadToCloudinary(localFilePath)).url;
    }

    if (!title || !desc || !category || !image) {
        res.status(422);
        throw new Error("One or more fields are missing.");
    }

    const q =
        "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `category` = ? WHERE id = ? AND uid = ?";

    await db.execute(q, [title, desc, image, category, postId, req.user.id]);

    return res.status(201).json({
        message: "The post has been successfully updated and published.",
        insertId: postId,
    });
});
