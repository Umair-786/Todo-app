const STORAGE_KEY = "todo";
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("taskinput");
const taskList = document.getElementById("tasklist");
const statusMessage = document.getElementById("status");

let tasks = [];

function setStatus(message) {
  statusMessage.textContent = message;
}

function loadpage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    if (!Array.isArray(parsed)) {
      throw new Error("Saved tasks are not a list.");
    }

    tasks = parsed
      .filter(
        (task) =>
          task &&
          (typeof task.id === "string" || typeof task.id === "number") &&
          typeof task.text === "string" &&
          task.text.trim()
      )
      .map((task) => ({
        id: String(task.id),
        text: task.text.trim().slice(0, 200),
      }));
  } catch {
    tasks = [];
    setStatus("Saved tasks could not be loaded. Starting with an empty list.");
  }

  renderTasks();
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch {
    setStatus("Your browser could not save tasks. They may be lost when you close this page.");
    return false;
  }
}

function renderTasks() {
  taskList.replaceChildren();

  if (tasks.length === 0) {
    const emptyMessage = document.createElement("li");
    emptyMessage.className = "empty-state";
    emptyMessage.textContent = "No tasks yet. Add one above.";
    taskList.appendChild(emptyMessage);
    return;
  }

  tasks.forEach((task) => {
    const item = document.createElement("li");
    const text = document.createElement("span");
    const deleteButton = document.createElement("button");

    text.className = "task-text";
    text.textContent = task.text;

    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "Completed";
    deleteButton.setAttribute("aria-label", `Delete task: ${task.text}`);
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    item.append(text, deleteButton);
    taskList.appendChild(item);
  });
}

function addTask(event) {
  event.preventDefault();
  const text = taskInput.value.trim();

  if (!text) {
    setStatus("Please enter a task first.");
    taskInput.focus();
    return;
  }

  const task = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    text,
  };

  tasks.push(task);
  renderTasks();
  const saved = saveTasks();
  taskInput.value = "";
  setStatus(saved ? "Task added." : statusMessage.textContent);
  taskInput.focus();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
  const saved = saveTasks();

  if (saved) {
    setStatus("Task deleted.");
  }
}

taskForm.addEventListener("submit", addTask);
loadpage();
