import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

export const dbConnection = async ()=>{
    try{
      const con = await  mongoose.connect(process.env.MONGO_DB_URL);
      console.log(`MongoDB Connected: ${con.connection.host}`);
    }
    catch(error){
       console.log(error);
    }
}