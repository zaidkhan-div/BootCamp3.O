const express = require("express");
const app = express();

require("dotenv").config();
const cors = require("cors");

let dbConnect = require("./config/db");
const appRoutes = require("./routes/index");

app.use(express.json());
app.use(cors());

// database connect
dbConnect(process.env.MONGO_URI);

app.use("/api", appRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is ruuning in ${PORT}`));
