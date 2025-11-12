import express from "express"
import { getAllPatients, getPatientAppointments } from "../controllers/patientControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getAllPatients", authMiddleware, getAllPatients);

router.get("/appointments", authMiddleware, getPatientAppointments)

export default router;