import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";
import connectDb from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import incomeRoutes from "./routes/incomeRoutes.js"
import expenseRoutes from "./routes/expenseRoutes.js"
import dashbaordRoutes from "./routes/dashbaordRoutes.js"


dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());


// Sample route
app.get("/", (req, res) => {
    res.send("API is running...");
});

connectDb();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashbaord", dashbaordRoutes);


// save uploads folder
app.use("/upload", express.static(path.join(__dirname, "uploads")));

// Start server
const PORT =  5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
