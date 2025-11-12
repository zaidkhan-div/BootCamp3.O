import express from "express";
import { getAllDoctors, addDoctor, getDoctorAppointments } from "../controllers/doctorControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all doctors
router.get("/getAllDoctors", authMiddleware, getAllDoctors);

// POST add new doctor
router.post("/addDoctor", authMiddleware, addDoctor);

router.get("/appointments", authMiddleware, getDoctorAppointments);


export default router;
