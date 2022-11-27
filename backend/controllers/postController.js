import jwt from "jsonwebtoken";
import { db } from "../db.js";

export const getPosts = (req, res) => {
    const category = req.query.cat;
    const q = category
        ? "SELECT * FROM posts WHERE category = ?"
        : "SELECT * FROM posts";

    db.query(q, [category], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
};

export const getPost = (req, res) => {
    const q =
        "SELECT `username`, `title`, `desc`, posts.img, users.img AS userImg, `category`, `date` FROM users JOIN posts on users.id = posts.uid WHERE posts.id = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(404).json(err);
        return res.status(200).json(data[0]);
    });
};

export const addPost = (req, res) => {};

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

export const updatePost = (req, res) => {};
