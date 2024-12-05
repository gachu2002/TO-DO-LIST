import {Task} from './Task.js'
const { isSameDay } = require("date-fns");
const { differenceInDays } = require("date-fns");

export class TaskList {
    tasks;
    constructor(tasks) {
        this.tasks = tasks;
    }

    addTask(task) {
        if(task instanceof Task) {
            this.tasks.push(task);
        } else {
            throw new Error("Invalid index for adding task")
        }
        return task;
    }

    editTask(index, task) {
        if(index >= 0 && index < this.tasks.length) {
            this.tasks[index] = task;
        } else {
            throw new Error("Invalid index for editing task")
        }
    }

    removeTask(index) {
        if(index >= 0 && index < this.tasks.length) {
            this.tasks.splice(index, 1);
        } else {
            throw new Error("Invalid index for removing task")
        }
    }

    getTasks() {
        return this.tasks;
    }

    getTasksByPriority(priority) {
        return this.tasks.filter(task => task.priority === priority);
    }

    getTasksByDueDate(dueDate) {
        return this.tasks.filter(task => isSameDay(task.dueDate, dueDate));
    }

    getTasksByDifferenceDueDate(dueDate, difference) {
        return this.tasks.filter(task => differenceInDays(task.dueDate, dueDate)  <= difference);
    }
    
}