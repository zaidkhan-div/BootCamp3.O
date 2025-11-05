import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Last30DaysExpenses = ({ data }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);
    }, [data]);

    const getBarColor = (index) => (index % 2 === 0 ? "#875cf5" : "#cfbefb");

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-center">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>

            <div className="bg-white mt-6 rounded-lg">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid stroke="none" />
                        
                        <XAxis dataKey="category" tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                        <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

                        <Tooltip
                            contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #ddd" }}
                            formatter={(value) => [`$${value}`, "Amount"]}
                            labelFormatter={(label) => `Category: ${label}`}
                        />

                        <Bar dataKey="amount" radius={[10, 10, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={index} fill={getBarColor(index)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Last30DaysExpenses;
