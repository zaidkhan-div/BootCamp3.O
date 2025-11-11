import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  appointmentDate: { type: String, required: true },
  timeSlot: { type: String, required: true }, // e.g. "Fri 9AM - 10AM"
  reason: { type: String },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending",
  }
}, { timestamps: true });


export default mongoose.model("Appointment", appointmentSchema);
