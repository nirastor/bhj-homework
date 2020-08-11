const elButton = document.getElementById('tasks__add');
const elTaskList = document.getElementById('tasks__list');
const elTaskInput = document.getElementById('task__input');
const taskTemplate = document.getElementById('task-template').content.querySelector('.task');

console.log(elButton, elTaskInput, elTaskList, taskTemplate);

function addTask(text) {
    if (!text) {
        return;
    }
    
    elTaskInput.value = '';
    
    const newTask = taskTemplate.cloneNode(true);
    
    const newTaskText = newTask.querySelector('.task__title');
    newTaskText.innerText = text;
    
    const newTaskClose = newTask.querySelector('.task__remove');
    newTaskClose.addEventListener('click', (e) => {
        e.preventDefault();
        newTask.remove();
    });
    
    elTaskList.appendChild(newTask);
}

elButton.addEventListener('click', (e) => {
    e.preventDefault();
    addTask(elTaskInput.value);
});

document.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        addTask(elTaskInput.value);
    }
});