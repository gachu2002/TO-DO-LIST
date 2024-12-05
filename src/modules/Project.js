import { TaskList } from "./TaskList";

export class Project {
    constructor(title, description, taskList) {
        this.title = title;
        this.description = description;
        this.taskList = taskList;
    }
}

