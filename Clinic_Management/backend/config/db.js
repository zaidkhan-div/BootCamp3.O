import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB is connected Successfully");
    } catch (error) {
        console.error("Error connecting to mongodb");
        process.exit();
    }
}

export default connectDb;