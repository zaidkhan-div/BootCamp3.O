import Income from "../models/Income";
import Expense from "../models/Expense";
import { isValidObjectId, Types } from "mongoose";

// Dashbaord Data 

export const getDashbaordData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));
        // Fetch total income & expenses
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { id: null, total: { $sum: "$amount" } } },
        ]);
        console.log("totalIncome", { totalIncome, userId: isValidObjectId(userId) });

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ]);

        // Get income transactions in the last 60 days

        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        // Get total income for last 60 days

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );
        // Get expense transactions in the last 30 days

        const last60DaysExpeneTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 })

        // Get total Expnse for last 60 days
        const expenseLast60Days = last60DaysExpeneTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Fetch last 5 transactions (income + expenses)
        const lastTransactions = [
            ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map((txn) => ({
                ...txn.toObject(),
                type: "income",
            })),
            ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map((txn) => ({
                ...txn.toObject(),
                type: "expense",
            })),
        ].sort((a, b) => b.date - a.date); // Sort latest first

        // Final response

        // Final Response
        res.json({
            totalBalance:
                (totalIncome[0]?.total || 0)(totalExpense[0]?.total || 0),
            totalIncome:
                totalIncome[0]?.total || 0,
            totalExpenses: totalExpense[0]?.total || 0,
            last30Days Expenses:
            {
                total: expenses Last30Days,
                transactions: last30Days Expense Transactions,
            },
            last60Days Income: {
                total: incomeLast60Days,
                transactions: last60Days IncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });

    } catch (error) {

    }


}