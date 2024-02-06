import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import AuthRouter from "./routes/auth-router"
import UserRouter from "./routes/user-router";
import PostRouter from "./routes/post-router";
import ConversationRouter from "./routes/conversation";
import MessageRouter from "./routes/message";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res; 
}

const storage = multer.diskStorage({
  destination: './',
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    // Accept only files with image extensions
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
});

app.use(upload.single('file'));
  
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/post", PostRouter);
app.use("/api/conversation", ConversationRouter);
app.use("/api/message", MessageRouter);

mongoose
  .connect(process.env.Conn_String, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(process.env.PORT || 5000))
  .then(() => console.log("Connected to Database and server started"))
  .catch((err) => console.log(err));
