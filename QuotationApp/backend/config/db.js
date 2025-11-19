const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    console.log('Attempting to connect to the database...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✔ Database connected");
  } catch (error) {
    console.log("❌ Database not Connected", error.message);
    console.error(error);
  }
};


module.exports = dbConnect;
