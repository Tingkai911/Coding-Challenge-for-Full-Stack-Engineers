import express from "express";
import multer from "multer";
import path from "path";
import {admin, protect} from "../middleware/authMiddleware.js";

const router = express.Router();

// Config setup to upload images to the server using multer
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

// Check if the file is an image
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Images only");
    }
}

// Create a middleware that we are going to pass to our route
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// Upload a single image
router.route("/").post(protect, admin, upload.single("image"), (req, res) => {
    res.send(`/${req.file.path}`);
});

export default router;
