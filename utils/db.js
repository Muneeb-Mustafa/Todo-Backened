import mongoose from "mongoose";


const DbConnect = async()=>{
    try {
        mongoose.connect(process.env.DB_CONNECT);
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
    }
}

export default DbConnect;