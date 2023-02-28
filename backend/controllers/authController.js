import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { db } from "../db.js";

// @desc    Add a new user to DB
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    // Looking for missing fields
    if (!email || !username || !password) {
        res.status(400);
        throw new Error("One or more fields are missing.");
    }

    // Check if user already exist.
    const existQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
    const [isExist] = await db.execute(existQuery, [email, username]);

    if (isExist.length > 0) {
        res.status(409);
        throw new Error("The user already exists.");
    }

    // User does not exist, hashing password and creating a new user.
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);

    const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?, ?, ?)";
    const [data] = await db.execute(q, [username, email, hash]);

    return res.json({ message: "Thank you for registering to our platform." });
});

// @desc    Authenticate the user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Check if user exist in the DB or not.
    const q = "SELECT * FROM users WHERE username = ?";
    const [data] = await db.execute(q, [username]);

    if (data.length === 0) {
        res.status(404);
        throw new Error("Invalid username, please try again");
    }

    // User exist in the DB, checking password.
    const isPasswordCorrect = bcryptjs.compareSync(password, data[0].password);

    if (!isPasswordCorrect) {
        res.status(400);
        throw new Error("Invalid username or password, please try again");
    }

    const { password: hashedPassword, ...otherUserData } = data[0];

    const token = jwt.sign({ id: data[0].id }, process.env.JWT_KEY, { expiresIn: "180d" });

    res.cookie("access_token", token, {
        maxAge: 90 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
    })
        .status(200)
        .json(otherUserData);
});

// @desc    Deauthenticate the user
// @route   POST /api/auth/logout
// @access  Public
export const logout = (req, res) => {
    res.clearCookie("access_token", { sameSite: "none", secure: true }).status(200).json();
};
