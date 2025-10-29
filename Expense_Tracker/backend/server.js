import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Sample route
app.get("/", (req, res) => {
    res.send("API is running...");
});

connectDb();

app.use("/api/v1/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
