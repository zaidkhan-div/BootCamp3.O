import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("Monngose Connected");

    } catch (error) {
        console.error("Errro Connecting to mongodb",);
        process.exit(1);
    }
}

export default connectDb;
