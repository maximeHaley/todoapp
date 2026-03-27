import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGOURL;

mongoose.connect(MONGOURL).then(() => {
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
  });
});

const taskSchema = new mongoose.Schema({
  task: String,
});

const taskModel = new mongoose.model("tasks", taskSchema);

app.get("/tasks", async (req, res) => {
  const taskData = await taskModel.find();
  res.json(taskData);
});
