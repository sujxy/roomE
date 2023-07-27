import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import RoomEUser from "./models/roomeUsers.js";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
app.use(cookieParser());
app.use(express.json()); // Parse JSON data in the request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data in the request body
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`connected to ${PORT} successfully !`));
  })
  .catch((err) => console.log(`${err} couldnt connect to servers !`));

app.post("/logout", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    if (userData) {
      res.cookie("token", "").json(true);
    }
  }
});
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
