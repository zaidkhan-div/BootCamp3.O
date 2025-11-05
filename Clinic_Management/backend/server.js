import express from "express"

const app = express();
const PORT = 8000;


app.listen(PORT, function () {
    console.log("Server is running on Port:", PORT)
})