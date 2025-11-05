import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    age: { type: Number },
    address: { type: String },
    bloodGroup: { type: String },
    medicalHistory: { type: [String] },
  },
  { timestamps: true }
);

export default mongoose.model("Patient", patientSchema);