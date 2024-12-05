import '../styles/form.css';

export class Form {
    constructor() {
        this.form = document.querySelector('.task-form');
        this.title = document.querySelector('#title');
        this.description = document.querySelector('#description');
        this.dueDate = document.querySelector('#due-date');
        this.priority = document.querySelector('#priority');
        this.submit = document.querySelector('.submit');
    }

    getFormValues() {
        return {
            title: this.title.value,
            description: this.description.value,
            dueDate: this.dueDate.value,
            priority: this.priority.value
        }
    }

    clearForm() {
        this.title.value = '';
        this.description.value = '';
        this.dueDate.value = '';
        this.priority.value = '';
    }
}