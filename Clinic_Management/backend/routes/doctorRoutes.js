import express from "express"
import { getAllDoctors } from "../controllers/doctorControllers.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router();

router.get("/getAllDoctors", authMiddleware, getAllDoctors);

export default router;