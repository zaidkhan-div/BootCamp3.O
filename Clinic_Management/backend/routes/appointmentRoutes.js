import express from "express";
import {
  createAppointment,
  getAllAppointments,
  getUserAppointments,
  deleteAppointment,
} from "../controllers/appointmentControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new appointment (patient books)
router.post("/create", authMiddleware, createAppointment);

// Get all appointments (admin)
router.get("/all", getAllAppointments);

// Get appointments by user (patient)
router.get("/user/:userId", getUserAppointments);

// Delete an appointment (admin or patient)
router.delete("/cancel/:id", deleteAppointment);


export default router;