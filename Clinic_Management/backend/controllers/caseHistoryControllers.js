import CaseHistory from "../models/caseHistoryModel.js";
import Appointment from "../models/appointmentModal.js";
import Doctor from "../models/doctorModal.js";
import Patient from "../models/patientModal.js";

/* =====================================================
   ✅ DOCTOR: CREATE CASE HISTORY
===================================================== */
export const createCaseHistory = async (req, res) => {
    try {
        const { appointmentId, medicines, reports, notes } = req.body;
        const doctorId = req.user.id; // from middleware
        const role = req.user.role;

        if (role !== "doctor") {
            return res.status(403).json({ message: "Only doctors can create case histories." });
        }

        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found." });
        }

        // Ensure the appointment belongs to the same doctor
        if (appointment.doctorId.toString() !== doctorId) {
            return res.status(403).json({ message: "You are not authorized for this appointment." });
        }

        // Get patient from the appointment (userId)
        const patient = await Patient.findOne({ userId: appointment.userId });
        if (!patient) {
            return res.status(404).json({ message: "Patient record not found." });
        }

        const caseHistory = new CaseHistory({
            appointmentId,
            doctorId,
            patientId: patient._id,
            medicines,
            reports,
            notes,
        });

        await caseHistory.save();
        res.status(201).json({ message: "Case history created successfully.", data: caseHistory });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/* =====================================================
   ✅ ADMIN: GET ALL CASE HISTORIES
===================================================== */
export const getAllCaseHistories = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied." });
        }

        const caseHistories = await CaseHistory.find()
            .populate("doctorId", "name email specialization")
            .populate("patientId", "userId age bloodGroup")
            .populate("appointmentId")
            .sort({ createdAt: -1 });

        res.json({ message: "Case histories fetched successfully", data: caseHistories });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

/* =====================================================
   ✅ DOCTOR: GET OWN CASE HISTORIES
===================================================== */
export const getDoctorCaseHistories = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const role = req.user.role;

        if (role !== "doctor") {
            return res.status(403).json({ message: "Only doctors can view this data." });
        }

        const histories = await CaseHistory.find({ doctorId })
            .populate("patientId", "userId age bloodGroup")
            .populate("appointmentId", "appointmentDate timeSlot")
            .sort({ createdAt: -1 });

        res.json({ message: "Doctor case histories fetched", data: histories });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

/* =====================================================
   ✅ PATIENT: GET OWN CASE HISTORIES
===================================================== */
export const getPatientCaseHistories = async (req, res) => {
    try {
        const userId = req.user.id;
        const role = req.user.role;

        if (role !== "patient") {
            return res.status(403).json({ message: "Only patients can access their case histories." });
        }

        const patient = await Patient.findOne({ userId });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found." });
        }

        const histories = await CaseHistory.find({ patientId: patient._id })
            .populate("doctorId", "name specialization")
            .populate("appointmentId", "appointmentDate timeSlot")
            .sort({ createdAt: -1 });

        res.json({ message: "Patient case histories fetched", data: histories });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

/* =====================================================
   ✅ PATIENT: DELETE OWN CASE HISTORY
===================================================== */
export const deleteCaseHistory = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const role = req.user.role;

        if (role !== "patient") {
            return res.status(403).json({ message: "Only patients can delete their case history." });
        }

        const patient = await Patient.findOne({ userId });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found." });
        }

        const caseHistory = await CaseHistory.findById(id);
        if (!caseHistory) {
            return res.status(404).json({ message: "Case history not found." });
        }

        if (caseHistory.patientId.toString() !== patient._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this record." });
        }

        await caseHistory.deleteOne();
        res.json({ message: "Case history deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
