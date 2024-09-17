// Select necessary elements
const todoForm = document.getElementById('todo-form');
const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Handle form submission
todoForm.addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();
    
    // Get the task input
    const taskText = newTaskInput.value;
    
    // Create a new list item
    const li = document.createElement('li');
    li.innerHTML = `
        ${taskText}
        <button>Delete</button>
    `;
    
    // Add event listener for marking complete
    li.addEventListener('click', toggleComplete);
    
    // Add event listener for deleting
    li.querySelector('button').addEventListener('click', deleteTask);
    
    // Append the new task to the task list
    taskList.appendChild(li);
    
    // Save to local storage
    saveTaskToLocalStorage(taskText);
    
    // Clear the input field
    newTaskInput.value = '';
}

function toggleComplete(e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('completed');
    }
}

function deleteTask(e) {
    const taskItem = e.target.parentElement;
    
    // Remove task from local storage
    removeTaskFromLocalStorage(taskItem.textContent);
    
    // Remove task from the DOM
    taskItem.remove();
}

function saveTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

function removeTaskFromLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(t => t !== task.replace('Delete', '').trim());
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task}
            <button>Delete</button>
        `;
        li.addEventListener('click', toggleComplete);
        li.querySelector('button').addEventListener('click', deleteTask);
        taskList.appendChild(li);
    });
}
