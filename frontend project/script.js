const addButton = document.getElementById('add-task');
const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.toggle('completed', task.completed);
    li.innerHTML = `
      <span>${task.text}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    li.querySelector('span').addEventListener('click', () => toggleTask(index));
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    newTaskInput.value = '';
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

renderTasks();
