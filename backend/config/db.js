import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://since1992april10_db_user:fBub4cgucD8WHIRW@cluster0.r5s7diq.mongodb.net/?appName=Cluster0' );
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error); 
    process.exit(1); 
  }         
};    
  

    