import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async ()=>{
    try{
        const conn =await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb Connected : ${conn.connection.host}`);
    } catch (error){
     console.error(`Error: ${error.message}`);
     process.exit(1);
    }
}