import express from "express";
import connectDB from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/router.js";
dotenv.config();
const server = express();
server.use(
  cors({
    origin: "http://localhost:3000", // Allow the specific origin
    methods: ["GET", "POST"], // Specify allowed methods
    credentials: true, // Allow credentials
  })
);
server.use(cookieParser());
const PORT = 8000;
server.use(express.json());
server.use(userRouter);

server.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
  connectDB();
});
