import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import multer from "multer";
import path from "path";

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

export const upload = multer({
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

export const uploadToCloudinary = async (locaFilePath) => {
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
};

export const deleteFromCloudinary = async (imgUrl) => {
    const temp = imgUrl.split("/");
    const imgId = temp[temp.length - 1].split(".")[0];

    await cloudinary.uploader.destroy(`posts/${imgId}`, {
        invalidate: "true",
    });
};
