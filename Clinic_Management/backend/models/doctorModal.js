import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    scheduleIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Schedule",
      },
    ],
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    fee: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
