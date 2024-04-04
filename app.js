import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
// import path from "path";
export const app = express();


dotenv.config();

// { path: "./backend/config/config.env" }

connectDatabase();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());


import { userRouter } from "./routes/User.js";
app.use("/api/v1", userRouter);

// app.use(express.static(path.resolve("./frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve("./frontend/build/index.html"));
// });


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port} `);
});
