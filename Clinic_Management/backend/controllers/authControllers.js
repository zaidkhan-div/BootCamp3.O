import User from "../models/userModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

// Register User (Only Patients Register Manually)
export const registerUser = async (req, res) => {
    try {
        const { name, email, age, password, phone, gender } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Email already registered" });

        // Create new patient (role = patient)
        const newUser = new User({
            name,
            email,
            age,
            password,
            phone,
            gender,
            role: "patient"
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "Patient registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                age: newUser.age,
                role: newUser.role
            }
        });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


// Login Userexport const loginUser = async (req, res) => {
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "User not found" });

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(400).json({ message: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Get Profile (Protected)
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error("Get Profile Error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
