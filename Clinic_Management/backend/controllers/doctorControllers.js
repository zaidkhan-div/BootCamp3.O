import User from "../models/userModal.js";
import Doctor from "../models/doctorModal.js";
import bcrypt from "bcryptjs";

// GET all doctors
export const getAllDoctors = async (req, res) => {
    try {
        const totalDoctors = await User.countDocuments({ role: "doctor" });

        const doctors = await Doctor.find()
            .populate("userId", "-password")
            .limit(100)
            .sort({ createdAt: -1 });

        // Optional: statistics by specialization
        const doctorsBySpecialization = await Doctor.aggregate([
            { $group: { _id: "$specialization", count: { $sum: 1 } } }
        ]);

        res.json({
            totalDoctors,
            doctors,
            statistics: {
                bySpecialization: doctorsBySpecialization,
            }
        });

    } catch (error) {
        console.log("Error fetching doctors,", error.message || error);
        res.status(500).json({ message: "Server Error" });
    }
};

// POST add new doctor
export const addDoctor = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            age,
            phone,
            gender,
            specialization,
            experience,
            roomId,
            fee,
            scheduleIds,
        } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create User
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            age,
            phone,
            gender,
            role: "doctor",
        });

        // Create Doctor
        const newDoctor = await Doctor.create({
            userId: newUser._id,
            name,
            age,
            phone,
            specialization,
            experience,
            roomId,
            fee,
            scheduleIds,
        });

        const doctorInfo = await Doctor.findById(newDoctor._id).populate("userId", "-password");
        res.status(201).json({ message: "Doctor added successfully", doctor: doctorInfo });

    } catch (error) {
        console.error("Error adding doctor:", error.message || error);
        res.status(500).json({ message: "Server Error" });
    }
};

