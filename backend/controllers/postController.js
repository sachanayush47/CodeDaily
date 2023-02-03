import jwt from "jsonwebtoken";
import { db } from "../db.js";

// Get all posts
export const getPosts = (req, res) => {
    const category = req.query.cat;
    const q = category
        ? "SELECT * FROM posts WHERE category = ? ORDER BY date DESC"
        : "SELECT * FROM posts ORDER BY date DESC";

    db.query(q, [category], (err, data) => {
        if (err) return res.json(err);

        // Limiting character count
        data.forEach((item) => {
            item.desc = item.desc.substring(0, 200);
        });

        return res.status(200).json(data);
    });
};

// Get a post
export const getPost = (req, res) => {
    const q =
        "SELECT posts.id, `username`, `title`, `desc`, posts.img, users.img AS userImg, `category`, `date` FROM users JOIN posts on users.id = posts.uid WHERE posts.id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(data[0]);
    });
};

// Add a new post to DB
export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if (err) res.status(403).json("Invalid token");

        const q =
            "INSERT INTO posts(`title`, `desc`, `img`, `category`, `date`, `uid`) VALUES (?)";

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.category,
            req.body.date,
            userInfo.id,
        ];

        if (req.body.desc.length < 200)
            return res
                .status(400)
                .json("Character count of description is less then 200");

        db.query(q, [values], (err, data) => {
            if (err) res.status(500).json(err);
            return res.status(201).json({
                message: "Published successfully",
                insertId: data.insertId,
            });
        });
    });
};

// Delete a post from the DB
export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if (err) res.status(403).json("Invalid token");
        const q = "DELETE FROM posts WHERE id = ? AND uid = ?";

        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) res.status(403).status("Unauthorized");

            res.json("Post has been deleted");
        });
    });
};

// Update a post from the DB
export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
        if (err) res.status(403).json("Invalid token");

        const postId = req.params.id;

        const q =
            "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `category` = ? WHERE id = ? AND uid = ?";

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.category,
        ];

        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if (err) res.status(500).json(err);
            return res
                .status(201)
                .json({ message: "Updated and published successfully" });
        });
    });
};
