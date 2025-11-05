import mongoose from "mongoose";

const Appointmensts = new mongoose.Schema(
    {
        patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
        doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
        roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
        date: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled", "completed"],
            default: "pending",
        },
        notes: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("Appointment", Appointmensts);
