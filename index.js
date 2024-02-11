// Import the express module
const express = require('express');

// Import the Task class
const Task = require('./task');

// Create an instance of the Task class
const app = express();

// Set the port
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// array to store tasks, because we don't want to use a database for this example
let tasks = [];

// A method to create a new task
app.post(`/tasks`, (req, res) => {
    const {title, description} = req.body;

    try {
        if (!Task.existTitle(title)) {
            res.status(400).json({
                status: 400,
                message: 'The task was not created because the title is required'
            });
        } else {
            const newTask = new Task(tasks.length + 1, title, description);
            tasks.push(newTask);
            res.status(201).json(newTask);
        }
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({status: 500, message: 'Internal server error while creating the task.'});
    }

});

// A method to get all tasks
app.get(`/tasks`, (req, res) => {
    try {
        if (Task.isEmpty(tasks)) {
            res.status(404).json({status: 404, message: 'There are no tasks yet'});
        } else {
            res.status(200).json(tasks);
        }
    } catch (error) {
        console.error('Error getting tasks:', error);
        res.status(500).json({status: 500, message: 'Internal server error while getting the tasks.'});
    }

});

// A method to count the total number of tasks
app.get(`/tasks/count`, (req, res) => {
    try {
        if (Task.isEmpty(tasks)) {
            res.status(404).json({status: 404, message: 'There are no tasks yet'});
        } else {
            res.status(200).json({count: Task.countTasks(tasks)});
        }
    } catch (error) {
        console.error('Error counting tasks:', error);
        res.status(500).json({status: 500, message: 'Internal server error while counting the tasks.'});
    }

});

// A method to count the total number of completed and uncompleted tasks
app.get(`/tasks/status`, (req, res) => {
    try {
        if (Task.isEmpty(tasks)) {
            res.status(404).json({
                status: 404,
                message: 'It was not possible to count the status of the tasks because there are no tasks yet'
            });
        } else {
            res.status(200).json(Task.countTaskStatus(tasks));
        }
    } catch (error) {
        console.error('Error counting completed and uncompleted tasks:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error while counting the completed and uncompleted tasks.'
        });
    }
});


// A method to get the recent task
app.get(`/tasks/recent`, (req, res) => {
    try {
        if (Task.isEmpty(tasks)) {
            res.status(404).json({status: 404, message: 'There is no recent task because there are no tasks yet'});
        } else {
            res.status(200).json({RecentTask: Task.recentTask(tasks)});
        }
    } catch (error) {
        console.error('Error getting the recent task', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error while getting the recent task.'
        });
    }
});

// A method to get the oldest task
app.get(`/tasks/oldest`, (req, res) => {
    try {
        if (Task.isEmpty(tasks)) {
            res.status(404).json({status: 404, message: 'There is no oldest task because there are no tasks yet'});
        } else {
            res.status(200).json({RecentTask: Task.oldestTask(tasks)});
        }
    } catch (error) {
        console.error('Error getting the oldest task', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error while getting the oldest task.'
        });
    }
});

// A method to get a task by id
app.get(`/tasks/:id`, (req, res) => {
    try {
        const {id} = req.params;

        const task = Task.getTaskById(tasks, id);
        if (!task) {
            res.status(404).json({status: 404, message: `Task not found by id: ${id}`});
        } else {
            res.status(200).json(task);
        }
    } catch (error) {
        console.error('Error getting a task by id.', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error while a task by id.'
        });
    }
});

// A method to update a task by id
app.put(`/tasks/:id`, (req, res) => {
    try {
        const {id} = req.params;
        const {title, description, completed} = req.body;

        const task = Task.getTaskById(tasks, id);

        if (!task) {
            res.status(404).json({
                status: 404,
                message: `The task was not updated because it was not found by id${id}`
            });
            return;
        }

        if (!Task.isParamsValid(title, description, completed)) {
            res.status(400).json({
                status: 400,
                message: 'The task was not updated because the parameters are invalid, missing or are empty. Title and description are required and completed must be a boolean.'
            });
            return;
        }

        task.title = title;
        task.description = description;
        task.completed = completed;
        res.status(200).json(task);
    } catch (error) {
        console.error('Error updating a task by id.', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error while updating a task by id.'
        });
    }
});

// A method to delete a task by id
app.delete(`/tasks/:id`, (req, res) => {
    try {
        const {id} = req.params;

        const task = Task.getTaskById(tasks, id);

        if (!task) {
            res.status(404).json({
                status: 404,
                message: `The task was not deleted because it was not found by id${id}`
            });
        } else {
            tasks = tasks.filter(task => task.id !== parseInt(id));
            res.status(200).json({status: 200, message: 'Task deleted', taskDeleted: task});
        }
    } catch (error) {
        console.error('Error deleting a task by id.', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error while deleting a task by id.'
        });
    }

});

// a method from express module to create the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});