import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import connectDB from './config/mongoDB.js';
import authRouter from './routes/auth_route.js';
import imageRouter from './routes/image_route.js';
dotenv.config();
connectDB()
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json({limit:"25mb"}));
app.use(cookieParser());

app.use("/api",imageRouter)
app.use("/api/user",authRouter)

app.get('/',(req,res)=>{
  return res.status(200).send("hello");
});

app.listen(PORT, ()=>{
 console.log(`Server is running on post ${PORT}`);
});
