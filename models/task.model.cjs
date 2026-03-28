const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required : true
  },
  date:{
    type:Date,
    required : false
  },
  timestamp:{
    type:Date,
    default:Date.now
  }
}
);

const taskModel = new mongoose.model("tasks", taskSchema);
module.exports = taskModel;