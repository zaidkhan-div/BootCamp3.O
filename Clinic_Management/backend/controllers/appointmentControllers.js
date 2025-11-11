import Appointment from "../models/appointmentModal.js";
import Doctor from "../models/doctorModal.js";
import User from "../models/userModal.js";

/* =====================================================
   ✅ ADMIN / PATIENT: CREATE APPOINTMENT
===================================================== */
export const createAppointment = async (req, res) => {
  try {
    const { userId, doctorId, appointmentDate, timeSlot, reason } = req.body;

    // Check for slot clash
    const existing = await Appointment.findOne({ doctorId, appointmentDate, timeSlot });
    if (existing) {
      return res.status(400).json({ message: "This time slot is already booked." });
    }

    const appointment = new Appointment({ userId, doctorId, appointmentDate, timeSlot, reason });
    await appointment.save();

    res.status(201).json({ message: "Appointment booked successfully", data: appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   ✅ ADMIN: GET ALL APPOINTMENTS
===================================================== */
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId", "name email phone")
      .populate("doctorId", "name specialization")
      .sort({ createdAt: -1 });

    res.json({ message: "Appointments fetched", data: appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =====================================================
   ✅ PATIENT: GET OWN APPOINTMENTS
===================================================== */
export const getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.params;
    const appointments = await Appointment.find()
      .populate("userId", "name email")
      .populate("doctorId", "name specialization")
      .sort({ appointmentDate: 1 });


    res.json({ message: "Appointments fetched", data: appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   ✅ DELETE APPOINTMENT
===================================================== */
export const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Appointment not found" });

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
