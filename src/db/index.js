import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async ()=>{
    try {
        console.log('database connected successfully ')
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(connectionInstance.connection.host);
        
    } catch (error) {
        console.log('Connection failed in try catch ',error);
        process.exit(1);
    }
}

export default connectDB;