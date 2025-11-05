import express from "express"
import connectDb from "./config/db.js";
import dotenv from "dotenv"
import cors from "cors"

const app = express();
const PORT = 8000;
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.get("/", (_, res) => {
    res.send(`API is working fine and running on Port: ${PORT}`,);
});

// app.use("/api/v1/auth",);
// app.use("/api/v1/auth",);
// app.use("/api/v1/auth",);
// app.use("/api/v1/auth",);

connectDb();

app.listen(PORT, function () {
    console.log("Server is running on Port:", PORT)
})