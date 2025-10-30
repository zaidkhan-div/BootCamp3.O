import User from "../models/User.js"
import Income from "../models/Income.js"
import xlsx from "xlsx"


// Income Controllers

export const addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        // Validation
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date),
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getAllIncome = async (req, res) => {

    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.json(income);

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}


export const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toDateString(),
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        const filePath = "income_details.xlsx";
        xlsx.writeFile(wb, filePath);

        res.download(filePath);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}


