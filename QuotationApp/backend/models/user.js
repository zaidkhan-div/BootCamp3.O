const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    profileImage : {type : String, default : "https://img.freepik.com/premium-vector/gray-picture-person-with-gray-background_1197690-22.jpg?semt=ais_hybrid&w=740&q=80"},
    gender : {type : String, enum : ['male', 'female', 'other'], default : 'male'}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
