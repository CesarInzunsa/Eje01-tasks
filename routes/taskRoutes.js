const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const {json} = require("express");

// Routes

// Get all tasks
router.get('/', (req, res) => {
    const tasks = taskController.getAllTasks();
    res.status(tasks.status).json(tasks);
})

// Create a task
router.post('/', (req, res) => {
    const {title, description} = req.body;
    const newTask = taskController.createTask(title, description)
    res.status(newTask.status).json(newTask);
})

// Get the number of tasks
router.get('/count', (req, res) => {
    const numberOfTasks = taskController.getNumberOfTasks()
    res.status(numberOfTasks.status).json(numberOfTasks);
})

// Get total number of tasks by status
router.get('/status', (req, res) => {
    const numberOfTasksByStatus = taskController.getTasksByStatus()
    res.status(numberOfTasksByStatus.status).json(numberOfTasksByStatus);
})

// Get the recent tasks
router.get('/recent', (req, res) => {
    const recentTask = taskController.getRecentTask()
    res.status(recentTask.status).json(recentTask);
})

// Get the oldest tasks
router.get('/oldest', (req, res) => {
    const oldestTask = taskController.getOldestTask()
    res.status(oldestTask.status).json(oldestTask);
})

// Get by id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    const taskByID = taskController.getTaskById(id)
    res.status(taskByID.status).json(taskByID);
})

// Update a task by id
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const {title, description, completed} = req.body;
    const updatedTask = taskController.updateTaskById(id, title, description, completed);
    res.status(updatedTask.status).json(updatedTask);
})

// Delete a task by id
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const deletedTask = taskController.deleteTaskById(id);
    res.status(deletedTask.status).json(deletedTask);
})

module.exports = router;