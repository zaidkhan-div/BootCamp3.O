import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("MongoDb Connected Successfully");
        
    } catch (error) {
        console.error("Error Connecting to mongodb",);
        process.exit(1);
    }
}

export default connectDb;
