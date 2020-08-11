const elButton = document.getElementById('tasks__add');
const elTaskList = document.getElementById('tasks__list');
const elTaskInput = document.getElementById('task__input');
const taskTemplate = document.getElementById('task-template').content.querySelector('.task');

// initialize taskID
let taskID = localStorage.getItem('nextTaskID');
if (!taskID) {
    taskID = 1;
}

// load tasks from storage
if (taskID > 1) {
    for (let i = 1; i < taskID; i++) {
        addTask(localStorage.getItem(i), true, i);
    }
}


function addTask(text, isLoad, id) {
    if (!text) {
        return;
    }
    
    elTaskInput.value = '';
    
    const newTask = taskTemplate.cloneNode(true);
    newTask.dataset.taskid = id;
    const newTaskText = newTask.querySelector('.task__title');
    newTaskText.innerText = text;
    
    const newTaskClose = newTask.querySelector('.task__remove');
    newTaskClose.addEventListener('click', (e) => {
        e.preventDefault();
        newTask.remove();
        localStorage.removeItem(id);
    });
    
    elTaskList.appendChild(newTask);
    
    // add task to local storage
    if (!isLoad) {
        localStorage.setItem(taskID, text);
        taskID++
        localStorage.setItem('nextTaskID', taskID)
    }
}

elButton.addEventListener('click', (e) => {
    e.preventDefault();
    addTask(elTaskInput.value, 0, taskID);
});

document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        addTask(elTaskInput.value, 0, taskID);
    }
});