const taskModel = require('../models/task.model.cjs');

const getTasks = async(req,res)=>{
    try {
        const taskData = await taskModel.find();
        res.status(200).json(taskData);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const createTask = async(req,res) =>{
  try {
    const task = await taskModel.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}
const getTask = async(req,res) =>{
  try {
    const {id} = req.params;
    const task = await taskModel.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({message:error.message});
  }
}

const updateTask = async (req,res) =>{
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
}

const deleteTask = async(req,res)=>{
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
}

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}