import express from "express";
import { registerUser, loginUser, getUserInfo } from "../controllers/authControllers.js";
import { protect } from "../middleware/authMiddleware.js"
import upload from "../middleware/uploadMiddlewar.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getUser", protect, getUserInfo);

router.post("/upload-img", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file upload" });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename
        }`
    res.status(200).json({ imageUrl })
})

export default router