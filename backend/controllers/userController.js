import { db } from "../db.js";
import bcryptjs from "bcryptjs";
import asyncHandler from "express-async-handler";

export const getUser = asyncHandler(async (req, res) => {
    const q = "SELECT id, username, email FROM users WHERE id = ?";
    const [data] = await db.execute(q, [req.params.id]);
    res.status(200).json(data[0]);
});

export const getUserPost = asyncHandler(async (req, res) => {
    const q = "SELECT id, title, date, category FROM posts WHERE uid = ?";
    const [data] = await db.execute(q, [req.params.id]);
    res.status(200).json(data);
});

export const changePassword = asyncHandler(async (req, res) => {
    const { password, password1, password2 } = req.body;
    if (password1 != password2) throw new Error("Password do not match");

    const getPasswordQuery = "SELECT password FROM users WHERE id = ?";
    const [data] = await db.execute(getPasswordQuery, [req.user.id]);

    const isPasswordCorrect = bcryptjs.compareSync(password, data[0].password);

    if (!isPasswordCorrect) {
        res.status(400);
        throw new Error("Invalid password");
    }

    const salt = bcryptjs.genSaltSync(10);
    const newPassword = bcryptjs.hashSync(password1, salt);

    const q = "UPDATE users SET password = ? WHERE id = ?";
    await db.execute(q, [newPassword, req.user.id]);

    return res.json({ message: "Password updated successfully" });
});
