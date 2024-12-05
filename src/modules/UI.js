import '../styles/task.css'

export class UI {
    constructor(taskArray) {
        this.taskArray = taskArray;
    }
    renderList() {
        const taskContainer = document.querySelector('.task-list');
        taskContainer.innerHTML = '';
        this.taskArray.forEach((element,index) => {
            const taskElement = this.createTaskElement(element,index);
            taskContainer.appendChild(taskElement);
        });
    }

    createTaskElement(element, index) {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        taskElement.setAttribute('data-index', index);
        taskElement.innerHTML = `
            <div data-priority="${element.priority}"></div>
            <h3>${element.title}</h3>
            <span>Date line: ${element.getRoundDueDate()}</span>
            <button class="edit">Edit</button>
            <button class="remove">Delete</button>
        `;
        return taskElement;
    }

    renderAddForm() {
        const formContainer = document.querySelector('.form-container');
        formContainer.innerHTML = this.getAddFormElement();
    }

    getAddFormElement() {
        return `
            <button class="close-form">Close</button>
            <form class="task-form">
                <label for="title">Title</label>
                <input type="text" id="title" required>
                <label for="description">Description</label>
                <textarea id="description" required></textarea>
                <label for="due-date">Due Date</label>
                <input type="date" id="due-date" required>
                <label for="priority">Priority</label>
                <select id="priority" required>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button type="submit" class="submit">Add Task</button>
            </form>
        `;
    }

    renderEditForm() {
        const formContainer = document.querySelector('.form-container');
        formContainer.innerHTML = this.EditFormElement();
    }

    EditFormElement() {
        return `
            <button class="close-form">Close</button>
            <form class="task-form">
                <label for="title">Title</label>
                <input type="text" id="title" required>
                <label for="description">Description</label>
                <textarea id="description" required></textarea>
                <label for="due-date">Due Date</label>
                <input type="date" id="due-date" required>
                <label for="priority">Priority</label>
                <select id="priority" required>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button type="submit" class="submit edit">Edit Task</button>
            </form>
        `;
    }
}