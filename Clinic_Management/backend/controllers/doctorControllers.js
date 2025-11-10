import User from "../models/userModal.js";

export const getAllDoctors = async (req, res) => {
    try {
        const totalDoctors = await User.countDocuments({ role: "doctor" });

        // Fetch all doctors (or limited if needed)
        const doctors = await User.find({ role: "doctor" })
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(100); // You can remove or adjust the limit

        // Optional: statistics by specialization
        const doctorsBySpecialization = await User.aggregate([
            { $match: { role: "doctor" } },
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
