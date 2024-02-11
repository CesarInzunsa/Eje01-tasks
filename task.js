module.exports = class Task {
    constructor(id, title, description = '', completed = false, createdAt = new Date()) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.createdAt = createdAt;
    }

    // A method to count the number of tasks
    static countTasks(tasks) {
        return tasks.length;
    }

    // A method to know if an array of tasks is empty
    static isEmpty(tasks) {
        return tasks.length === 0;
    }

    // A method to know is a title is valid or not
    static existTitle(title) {
        return title && title.trim().length > 0 && typeof title === 'string';
    }

    // A method to know if the parameters are valid or not
    static isParamsValid(title, description, completed) {
        return title && typeof title === 'string' && description && typeof description === 'string' && completed && typeof completed === 'boolean'
    }

    // A method to know how many tasks are completed and uncompleted
    static countTaskStatus(tasks) {
        return tasks.reduce((statusCounts, task) => {
            if (task.completed) {
                statusCounts.completed++;
            } else {
                statusCounts.uncompleted++;
            }
            return statusCounts;
        }, {completed: 0, uncompleted: 0});
    }

    // A method to get the recent task
    static recentTask(tasks) {
        return tasks.reduce((recentTaskTrack, currentTask) => {
            return recentTaskTrack.createdAt > currentTask.createdAt ? currentTask : recentTaskTrack;
        }, tasks[0]);
    }

    // A method to get the oldest task
    static oldestTask(tasks) {
        return tasks.reduce((oldestTaskTrack, currentTask) => {
            return oldestTaskTrack.createdAt < currentTask.createdAt ? currentTask : oldestTaskTrack;
        }, tasks[0]);
    }

    // A method to get a task by id
    static getTaskById(tasks, id) {
        return tasks.find(task => task.id === parseInt(id));
    }
}