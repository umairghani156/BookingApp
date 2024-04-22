import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import {dbConnection} from "./config/db.js";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";


const PORT = 5000;
const app = express();

dotenv.config()

// When mongo db is not connected
mongoose.connection.on("disconnected",()=>{
   console.log("mongoDB disconnected");
})
dbConnection()
app.use(cors({
  origin: "http://localhost:5173",
}))
app.use(cookieParser())
app.use(express.json())

//middlewares
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//Middleware for error handling

app.use((err,req, res, next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})


app.listen(PORT, ()=>{
    console.log("Server is running at 4000");
})
