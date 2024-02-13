const Task = require('../models/task');
const {json} = require("express");
let tasks = [
    {
        id: 1,
        title: 'Tarea 1',
        description: 'Descripcion de la tarea 1',
        completed: false,
        createdAt: new Date('2024-02-11T22:30:12.289Z'),
    },
    {
        id: 2,
        title: 'Tarea 2',
        description: 'Descripcion de la tarea 2',
        completed: false,
        createdAt: new Date('2024-02-12T21:30:12.289Z'),
    },
    {
        id: 3,
        title: 'Tarea 3',
        description: 'Descripcion de la tarea 3',
        completed: false,
        createdAt: new Date('2024-02-12T20:30:12.289Z'),
    }
]

// A method to get all tasks
function getAllTasks() {
    try {
        if (Task.isEmpty(tasks)) {
            return {status: 404, message: 'There are no tasks yet'};
        } else {
            return {status: 200, data: tasks};
        }
    } catch (error) {
        console.error('Error getting tasks:', error);
        return {status: 500, message: 'Internal server error while getting the tasks.'};
    }
}

// A method to create a new task
function createTask(title, description) {
    try {
        if (!Task.existTitle(title)) {
            return {status: 400, message: 'The task was not created because the title is required'};
        } else {
            const newTask = new Task(tasks.length + 1, title, description);
            tasks.push(newTask);
            return {status: 200, data: newTask};
        }
    } catch (error) {
        console.error('Error creating task:', error);
        return {status: 500, message: 'Internal server error while creating the task.'};
    }
}

// A method to get the number of tasks
function getNumberOfTasks() {
    try {
        if (Task.isEmpty(tasks)) {
            return {status: 404, message: 'There are no tasks yet'};
        } else {
            return {status: 200, count: Task.countTasks(tasks)};
        }
    } catch (error) {
        console.error('Error counting tasks:', error);
        return {status: 500, message: 'Internal server error while counting the tasks.'};
    }
}

// A method to get the tasks by status
function getTasksByStatus() {
    try {
        if (Task.isEmpty(tasks)) {
            return {
                status: 404,
                message: 'It was not possible to count the status of the tasks because there are no tasks yet'
            };
        } else {
            return {status: 200, TaskByStatus: Task.countTaskStatus(tasks)};
        }
    } catch (error) {
        console.error('Error counting completed and uncompleted tasks:', error);
        return {
            status: 500,
            message: 'Internal server error while counting the completed and uncompleted tasks.'
        };
    }
}

// A method to get the recent task
function getRecentTask() {
    try {
        if (Task.isEmpty(tasks)) {
            return {status: 404, message: 'There is no recent task because there are no tasks yet'};
        } else {
            return {status: 200, RecentTask: Task.recentTask(tasks)}
        }
    } catch (error) {
        console.error('Error getting the recent task', error);
        return {status: 500, message: 'Internal server error while getting the recent task.'};
    }
}

// A method to get the oldest task
function getOldestTask() {
    try {
        if (Task.isEmpty(tasks)) {
            return {status: 404, message: 'There is no oldest task because there are no tasks yet'};
        } else {
            return {status: 200, OldestTask: Task.oldestTask(tasks)};
        }
    } catch (error) {
        console.error('Error getting the oldest task', error);
        return {status: 500, message: 'Internal server error while getting the oldest task.'};
    }
}

// A method to get a task by id
function getTaskById(id) {
    try {
        const task = Task.getTaskById(tasks, id);
        if (!task) {
            return {status: 404, message: `Task not found by id: ${id}`};
        } else {
            return {status: 200, taskById: task};
        }
    } catch (error) {
        console.error('Error getting a task by id.', error);
        return {status: 500, message: 'Internal server error while getting a task by id.'};
    }
}

// A method to update a task by id
function updateTaskById(id, title, description, completed) {
    try {
        const task = Task.getTaskById(tasks, id);

        if (!task) {
            return {status: 404, message: `Task not found by id: ${id}`};
        }

        if (!Task.isParamsValid(title, description, completed)) {
            return {
                status: 400,
                message: 'The task was not updated because the parameters are invalid, missing or are empty. Title and description are required and completed must be a boolean.'
            };
        }

        task.title = title;
        task.description = description;
        task.completed = completed;
        return {status: 200, taskUpdated: task};
    } catch (error) {
        console.error('Error updating a task by id.', error);
        return {status: 500, message: 'Internal server error while updating a task by id.'};
    }
}

// A method to delete a task by id
function deleteTaskById(id) {
    try {
        const task = Task.getTaskById(tasks, id);

        if (!task) {
            return {status: 404, message: `The task was not deleted because it was not found by id: ${id}`};
        } else {
            tasks = tasks.filter(task => task.id !== parseInt(id));
            return {status: 200, deletedTask: task};
        }
    } catch (error) {
        console.error('Error deleting a task by id.', error);
        return {status: 500, message: 'Internal server error while deleting a task by id.'};
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getNumberOfTasks,
    getTasksByStatus,
    getRecentTask,
    getOldestTask,
    getTaskById,
    updateTaskById,
    deleteTaskById
}