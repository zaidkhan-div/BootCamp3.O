import User from "../models/userModal.js";
import Doctor from "../models/doctorModal.js";


// GET all doctors
export const getAllDoctors = async (req, res) => {
    try {
        const totalDoctors = await Doctor.countDocuments();

        const doctors = await Doctor.find()
            .limit(100)
            .sort({ createdAt: -1 });

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
        const { email } = req.body;

        // Check if email exists in User collection
        const userExists = await User.findOne({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(400).json({
                message: "This email is already registered as a user"
            });
        }

        // Check if email exists in Doctor collection
        const doctorExists = await Doctor.findOne({ email: email.toLowerCase() });
        if (doctorExists) {
            return res.status(400).json({
                message: "This email is already registered as a doctor"
            });
        }

        // Create new doctor
        const newDoctor = new Doctor(req.body);
        await newDoctor.save();

        res.status(201).json({
            message: "Doctor added successfully",
            doctor: newDoctor
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding doctor",
            error: error.message
        });
    }
};

