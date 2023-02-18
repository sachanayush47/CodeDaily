import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { db } from "../db.js";

export const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.status(401);
        throw new Error("It appears that you are not logged in.");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const q = "SELECT * FROM users WHERE id = ?";
        const [user] = await db.execute(q, [decoded.id]);

        if (user.length == 0) throw new Error();
        else {
            const { password, ...otherUserInfo } = user[0];
            req.user = otherUserInfo;
        }
    } catch (error) {
        res.status(403);
        throw new Error("Invalid token, please logout and login again.");
    }

    next();
});
