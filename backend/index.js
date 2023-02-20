import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import fs from "fs";
import path from "path";
// Error handler
import errorHandler from "./middleware/errorHandler.js";

// Routes
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Multer storage, stores user uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const modifiedFilename = file.originalname.replace(/\s+/g, "");
        cb(null, Date.now() + modifiedFilename);
    },
});

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 1 * 1024 * 1024, // 1 MB
    },

    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg") {
            return callback(new Error("Only JPG and JPEG images formats are allowed"));
        }
        callback(null, true);
    },
});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

async function uploadToCloudinary(locaFilePath) {
    const result = await cloudinary.uploader.upload(locaFilePath, {
        folder: "posts",
    });

    // Image has been successfully uploaded on cloudinary So we dont need local image
    // file anymore Remove file from local uploads folder
    fs.unlinkSync(locaFilePath);
    return {
        message: "Success",
        url: result.secure_url,
    };
}

// Upload image endpoint
app.post("/api/upload", upload.single("image"), async (req, res) => {
    const locaFilePath = req.file.path;
    const result = await uploadToCloudinary(locaFilePath);
    return res.status(200).json(result.url);
});

// Delete image from cloudinary
app.delete("/api/upload/:id", async (req, res) => {
    await cloudinary.uploader.destroy(`posts/${req.params.id}`, {
        invalidate: "true",
    });
    return res.status(200).json({ message: "Image has been deleted" });
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log("Server stared sucessfully at port " + process.env.PORT);
});
