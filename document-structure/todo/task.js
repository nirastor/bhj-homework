const elButton = document.getElementById('tasks__add');
const elTaskList = document.getElementById('tasks__list');
const elTaskInput = document.getElementById('task__input');
const taskTemplate = document.getElementById('task-template').content.querySelector('.task');

// В целом хранением всего списка в одной строке даже упростило код
// Удалось отказаться от параметра 'id задачи'

// есть ли событие закрытие окна или браузера,
// чтобы не вызывать saveTask после каждого изменения списка задач?
function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('.task__title'));
    const taskTitles = [];
    tasks.forEach(item => {
        // использовал encode-decode URI из следующих лекций, 
        // чтобы код был устойчвым к символу ';' в содержании задачи
        taskTitles.push(encodeURIComponent(item.textContent));
    });
    localStorage.todoListOfTasks = taskTitles.join(';')
}

function loadTasks() {
    const tasklist = localStorage.todoListOfTasks.split(';');
    for (let task of tasklist) {
        addTask(decodeURIComponent(task), 'isLoad');
    }
}

function addTask(text, isLoad = false) {
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
        saveTasks();
    });
    
    elTaskList.appendChild(newTask);
    
    // Возможно эта проверка не особо нужно, впринципе работает
    // даже если выполять пересохранение каждый раз в процессе восстановления задач
    // но кажется это глупо: несколько раз искать элемент и сохранть уже сохраненное
    if (!isLoad) {
        saveTasks();
    }
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

loadTasks();