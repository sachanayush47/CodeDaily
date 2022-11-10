import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { db } from "../db.js";

export const register = (req, res) => {
    const { email, username, password } = req.body;

    // Validating data.
    if (!email || !username || !password)
        return res.status(400).json("Please enter all the fields.");

    // Check if user already exist.
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q, [email, username], (err, data) => {
        if (err) return res.json(err); // Handling error
        if (data.length) return res.status(409).json("User already exists."); // Handling existing users

        // User does not exist, hashing password and creating a new user.
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        const q =
            "INSERT INTO users(`username`, `email`, `password`) VALUES (?)";
        const values = [username, email, hash];
        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.json("User has been created.");
        });
    });
};

export const login = (req, res) => {
    const { username, password } = req.body;

    // Check if user exist in the DB or not.
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [username], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("Invalid username");

        // User exist in the DB, checking password.
        const isPasswordCorrect = bcryptjs.compareSync(
            password,
            data[0].password
        );

        if (!isPasswordCorrect)
            return res.status(400).json("Invalid username or password");
        else {
            const { password, ...otherUserData } = data;

            const token = jwt.sign({ id: data[0].id }, process.env.JWT_KEY);
            res.cookie("access_token", token, { httpOnly: true })
                .status(200)
                .json(otherUserData);
        }
    });
};

export const logout = (req, res) => {
    res.clearCookie("access_token");
    res.status(200);
};
