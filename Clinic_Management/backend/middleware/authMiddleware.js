// import dotenv from "dotenv";
// import jwt from "jsonwebtoken";
// import User from "../models/userModal.js";

// dotenv.config();

// export const authMiddleware = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1]; 
//     // Bearer <token>
//     if (!token) return res.status(401).json({ message: "No token provided" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     if (!req.user) return res.status(404).json({ message: "User not found" });

//     next();
//   } catch (error) {
//     console.error("Auth Middleware Error:", error);
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };


import User from "../models/userModal.js";
import Doctor from "../models/doctorModal.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;
    if (decoded.role === "doctor") {
      user = await Doctor.findById(decoded.id);
    } else {
      user = await User.findById(decoded.id).select("-password");
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
