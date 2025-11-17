import express from "express";
import {
  createCaseHistory,
  getAllCaseHistories,
  getDoctorCaseHistories,
  getPatientCaseHistories,
  deleteCaseHistory,
} from "../controllers/caseHistoryControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* =====================================================
   ✅ DOCTOR: Create a case history
   POST /api/case-history
   Body: { appointmentId, medicines, reports, notes }
===================================================== */
router.post("/", authMiddleware, createCaseHistory);

/* =====================================================
   ✅ ADMIN: Get all case histories
   GET /api/case-history/all
===================================================== */
router.get("/all", authMiddleware, getAllCaseHistories);

/* =====================================================
   ✅ DOCTOR: Get own case histories
   GET /api/case-history/doctor
===================================================== */
router.get("/doctor", authMiddleware, getDoctorCaseHistories);

/* =====================================================
   ✅ PATIENT: Get own case histories
   GET /api/case-history/patient
===================================================== */
router.get("/patient", authMiddleware, getPatientCaseHistories);

/* =====================================================
   ✅ PATIENT: Delete own case history
   DELETE /api/case-history/:id
===================================================== */
router.delete("/:id", authMiddleware, deleteCaseHistory);

export default router;
