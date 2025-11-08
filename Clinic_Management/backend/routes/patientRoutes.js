import express from "express"
import { getAllPatients } from "../controllers/patientControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getAllPatients", authMiddleware, getAllPatients);

export default router;