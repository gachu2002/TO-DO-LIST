import './styles/main.css';
import { UI } from './modules/UI.js';
import { Task } from './modules/Task.js'
import { TaskList } from './modules/TaskList.js'
import { Form } from './modules/Form.js'


document.addEventListener('DOMContentLoaded', () => {
    const exampleTasks = new TaskList([
        new Task("Buy groceries", "Milk, bread, eggs, and fresh vegetables.", "2024-12-20", "high"),
        new Task("Complete project report", "Finish the draft for the semester project report.", "2024-12-02", "medium"),
        new Task("Schedule doctor appointment", "Book an appointment for a routine health check-up.", "2024-12-10", "low"),
        new Task("Call plumber", "Fix the leaking kitchen sink.", "2024-12-04", "high"),
        new Task("Prepare presentation slides", "Create slides for the client meeting on Monday.", "2024-12-07", "medium")
      ]);
      
    let ui = new UI(exampleTasks.getTasks());
    ui.renderList();

    const navContainer = document.querySelector('.nav-list');
    const taskContainer = document.querySelector('.task-list');
    const formContainer = document.querySelector('.form-container');
    const overlay = document.querySelector('.overlay');
    let chooseIndex = 0;

    const toggleHidden = (element) => {
        element.classList.toggle('hidden');
    }

    const toggleForm = () => {
        toggleHidden(formContainer);
        toggleHidden(overlay);
    }

    navContainer.addEventListener('click', (e) => {
        if(e.target.classList.contains('sub-item')) {
            switch(e.target.getAttribute('id')) {
                case "all":
                    ui = new UI(exampleTasks.getTasks());
                    break;
                case "today":
                    const todayTasks = exampleTasks.getTasksByDueDate(new Date());
                    ui = new UI(todayTasks);
                    break;
                case "week":
                    const weekTasks = exampleTasks.getTasksByDifferenceDueDate(new Date() , 7);
                    ui = new UI(weekTasks);
                    break;
            }
            ui.renderList();
        }
    });
    
    taskContainer.addEventListener('click', (e) => {
        if(e.target.classList.contains('remove')) {
            let index = Number(e.target.closest('.task').getAttribute('data-index'));
            exampleTasks.removeTask(index);
            ui.renderList();
        } else if (e.target.classList.contains('edit')) {
            let index = Number(e.target.closest('.task').getAttribute('data-index'));
            const task = exampleTasks.getTasks()[index];
            ui.renderEditForm();
            const form = new Form();
            form.title.value = task.title;
            form.description.value = task.description;
            form.dueDate.value = task.dueDate instanceof Date && !isNaN(task.dueDate) ? task.dueDate.toISOString().split('T')[0] : ''; // Check if dueDate is valid
            toggleForm();

            formContainer.addEventListener('submit', function updateTask(e) {
                e.preventDefault();
                const formValues = form.getFormValues();
                task.updateDetails(formValues);
                ui.renderList();
                toggleForm();
                console.log(form.getFormValues());
            });
        }
    });

    const addFormBtn = document.querySelector('.add-form-btn');
    addFormBtn.addEventListener('click', () => {
        ui.renderAddForm();
        toggleForm();
        formContainer.addEventListener('submit', (e) => {
            e.preventDefault();
            const form = new Form();
            const task = new Task(form.getFormValues().title, form.getFormValues().description, form.getFormValues().dueDate, form.getFormValues().priority);
            exampleTasks.addTask(task);
            ui.renderList();
            form.clearForm();
            toggleForm();
        });
    });

    formContainer.addEventListener('click', (e) => {
        if(e.target.classList.contains('close-form')) {
            toggleForm();
        }
    });

});

