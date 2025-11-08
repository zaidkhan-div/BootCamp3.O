import express from "express"
import { registerUser, loginUser, getUserProfile } from "../controllers/authControllers.js"
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/getUserProfile", authMiddleware, getUserProfile);

export default router