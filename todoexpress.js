import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskModel from './models/task.model.cjs'

const app = express();
dotenv.config();
app.use(express.json())
app.use(express.urlencoded({extended:false}));


const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGOURL;

mongoose.connect(MONGOURL).then(() => {
  console.log("Database connected");
  app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
  });
});


app.get("/tasks", async (req, res) => {
  const taskData = await taskModel.find();
  res.json(taskData);
});

app.post("/tasks", async(req,res) =>{
  try {
    const task = await taskModel.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})

app.get('/task/:id', async(req,res) =>{
  try {
    const {id} = req.params;
    const task = await taskModel.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
  
})

app.put('/task/:id', async (req,res) =>{
  try {
    const {id} = req.params;
    const task = await taskModel.findByIdAndUpdate(id,req.body);
    if (!task){
      return res.status(404).json({message:"Task not found"});
    }
    const updatedTask = await taskModel.findById(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})

app.delete('/task/:id', async(req,res)=>{
  try {
    const {id} = req.params;
    const task = await taskModel.findByIdAndDelete(id);
    if(!task){
      res.status(404).json({message:"Task not found"})
    }
    res.status(200).json({message:"Task deleted successfully"})
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})