const { formatISO } = require("date-fns");
export class Task {
    title;
    description;
    dueDate;
    priority;
    completed;

    constructor(title, description='', dueDate=null, priority='low') {
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.completed = false;
    }

    updateDetails({ title, description, dueDate, priority }) {
        if (title) this.title = title;
        if (description) this.description = description;
        if (dueDate) this.dueDate = dueDate;
        if (priority) this.priority = priority;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }

    isOverdue() {
        return !this.completed && this.dueDate < new Date();
    }

    getRoundDueDate() {
        return formatISO(this.dueDate, { representation: 'date' });
    }
}