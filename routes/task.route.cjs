const express = require("express");
const router = express.Router();
const task = require("../models/task.model.cjs")
const {getTasks, getTask, createTask, updateTask, deleteTask} = require('../controllers/task.controller.cjs');

router.get('/', getTasks);
router.get('/:id',getTask)
router.post('/',createTask);
router.put('/:id',updateTask);
router.delete('/:id',deleteTask);


module.exports = router;