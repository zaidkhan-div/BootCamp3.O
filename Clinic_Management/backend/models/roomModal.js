import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    schedule: {
      type: String, // e.g., "09:00 AM - 12:00 PM"
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Occupied"],
      default: "Available",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
