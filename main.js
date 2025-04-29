const addTaskBtn = document.getElementById("addTaskBtn");
const newContainer = document.getElementById("tasksNew");
const doneContainer = document.getElementById("tasksDone");

document.getElementById("tab-new").addEventListener("click", () => {
  newContainer.style.display = "block";
  doneContainer.style.display = "none";
});

document.getElementById("tab-done").addEventListener("click", () => {
  newContainer.style.display = "none";
  doneContainer.style.display = "block";
});

// Загружаем задачи при старте
window.addEventListener("load", loadTasks);

// Добавление новой задачи
addTaskBtn.addEventListener("click", () => {
  const text = prompt("Введите задачу:");
  if (!text.trim()) return;
  const task = { text, done: false };
  saveTask(task);
  renderAllTasks();
});

function loadTasks() {
  renderAllTasks();
}

function renderAllTasks() {
  clearContainers();
  const tasks = getTasks();
  tasks.forEach((task, index) => {
    renderTask(task, index);
  });
}

function clearContainers() {
  newContainer.innerHTML = "";
  doneContainer.innerHTML = "";
}

function renderTask(task, index) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("taskItem");

  const label = document.createElement("label");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.done;

  const span = document.createElement("span");
  span.textContent = task.text;
  span.classList.add("taskText");

  if (task.done) {
    label.classList.add("checked");
  }

  // При изменении чекбокса
  checkbox.addEventListener("change", () => {
    task.done = checkbox.checked;
    updateTask(index, task);
    renderAllTasks();
  });

  // Удаление
  const delBtn = document.createElement("button");
  delBtn.textContent = "🗑";
  delBtn.classList.add("deleteBtn");

  delBtn.addEventListener("click", () => {
    deleteTask(index);
    renderAllTasks();
  });

  label.appendChild(checkbox);
  label.appendChild(span);
  wrapper.appendChild(label);
  wrapper.appendChild(delBtn);

  if (task.done) {
    doneContainer.appendChild(wrapper);
  } else {
    newContainer.appendChild(wrapper);
  }
}

// Работа с localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(index, newTask) {
  const tasks = getTasks();
  tasks[index] = newTask;
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
