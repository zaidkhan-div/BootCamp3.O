import User from "../models/userModal.js"

export const getAllPatients = async (req, res) => {
    try {
        const totalPatients = await User.countDocuments({ role: "patient" });

        const patients = await User.find({ role: "patient" }).select('-password').sort({ createdAt: -1 });

        const recentPatients = await User.find({ role: 'patient' })
            .select('-password')
            .sort({ createdAt: -1 })
            .limit(5);

        const patiensByGender = await User.aggregate([
            { $match: { role: "patient" } },
            { $group: { _id: '$gender', count: { $sum: 1 } } }
        ]);

        res.json({
            totalPatients,
            patients,
            recentPatients,
            statistics: {
                byGender: patiensByGender,
            }
        });

    } catch (error) {
        console.log("Error fetching patients,", error.message || error);
        res.status(500).json({ message: "Server Error" });
    }
}