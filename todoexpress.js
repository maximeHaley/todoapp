import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskModel from './models/task.model.cjs'
import taskRoute from './routes/task.route.cjs'

const app = express();
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use("/tasks", taskRoute);

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGOURL;

mongoose.connect(MONGOURL).then(() => {
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
  });
});