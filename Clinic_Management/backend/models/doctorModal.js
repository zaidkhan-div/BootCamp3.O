import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: String, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true
    },
    specialization: {
      type: String,
      required: true
    },
    experience: {
      type: String,
      required: true
    },
    fee: {
      type: Number,
      required: true
    },
    roomId: {
      type: String,
      required: true
    },
    scheduleIds: [{
      type: String,
      required: true
    }],
    role: {
      type: String,
      default: "doctor",
      immutable: true
    },
    isApproved: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

doctorSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Doctor", doctorSchema);