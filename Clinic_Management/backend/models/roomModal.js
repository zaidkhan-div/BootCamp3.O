import mongoose from "mongoose";

const Rooms = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., "Room 1"
    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available",
    },
    currentDoctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", Rooms);
