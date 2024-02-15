const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authUtils = require('../middleware/authUtils');

function authenticate(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({status: 401, message: 'Unauthorized'});
    }

    const decodedToken = authUtils.verifyToken(token);
    if (!decodedToken) {
        return res.status(401).json({status: 401, message: 'Unauthorized'});
    }

    req.user = decodedToken;
    next();
};

// ------------------- TASK ROUTES ------------------- //

// Get all tasks
router.get('/', authenticate, (req, res) => {
    const tasks = taskController.getAllTasks();
    res.status(tasks.status).json(tasks);
});

// Create a task
router.post('/', authenticate, (req, res) => {
    const {title, description} = req.body;
    const newTask = taskController.createTask(title, description)
    res.status(newTask.status).json(newTask);
});

// Get the number of tasks
router.get('/count', authenticate, (req, res) => {
    const numberOfTasks = taskController.getNumberOfTasks()
    res.status(numberOfTasks.status).json(numberOfTasks);
});

// Get total number of tasks by status
router.get('/status', authenticate, (req, res) => {
    const numberOfTasksByStatus = taskController.getTasksByStatus()
    res.status(numberOfTasksByStatus.status).json(numberOfTasksByStatus);
});

// Get the recent tasks
router.get('/recent', authenticate, (req, res) => {
    const recentTask = taskController.getRecentTask()
    res.status(recentTask.status).json(recentTask);
});

// Get the oldest tasks
router.get('/oldest', authenticate, (req, res) => {
    const oldestTask = taskController.getOldestTask()
    res.status(oldestTask.status).json(oldestTask);
});

// Get by id
router.get('/:id', authenticate, (req, res) => {
    const {id} = req.params;
    const taskByID = taskController.getTaskById(id)
    res.status(taskByID.status).json(taskByID);
});

// Update a task by id
router.put('/:id', authenticate, (req, res) => {
    const {id} = req.params;
    const {title, description, completed} = req.body;
    const updatedTask = taskController.updateTaskById(id, title, description, completed);
    res.status(updatedTask.status).json(updatedTask);
});

// Delete a task by id
router.delete('/:id', authenticate, (req, res) => {
    const {id} = req.params;
    const deletedTask = taskController.deleteTaskById(id);
    res.status(deletedTask.status).json(deletedTask);
});

module.exports = router;