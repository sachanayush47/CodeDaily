import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";

import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../frontend/public/uploads");
    },
    filename: function (req, file, cb) {
        const modifiedFilename = file.originalname.replace(/\s+/g, "");

        cb(null, Date.now() + modifiedFilename);
    },
});

const upload = multer({ storage: storage });

// Upload image
app.post("/api/upload", upload.single("image"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server stared sucessfully");
});
