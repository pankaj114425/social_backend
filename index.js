const express=require("express");
const app=express();
const mongoose =require("mongoose");
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan=require("morgan");
const connectDB = require("./config/db");
const userRouter = require("./routes/userroutes");
const postRouter = require("./routes/postroutes");
const cookieParser = require('cookie-parser');
const multer  = require('multer')
const path = require("path");

dotenv.config();
connectDB(); ///mongoose connection 
const port=process.env.PORT || 3000
app.use("/images", express.static(path.join(__dirname, "public/images")));
// Increase payload limit to 50MB
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
///middlewares
app.use(cookieParser());
app.use(express.json());
app.use(helmet())
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  

  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single('file'), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

app.use('/api/user',userRouter)
app.use('/api/post',postRouter)
app.listen(port,()=>{
    console.log(`backend server is running at ${port}`.bgGreen);
})