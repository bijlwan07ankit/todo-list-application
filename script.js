document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
    document.getElementById("addTaskBtn").addEventListener("click", addTask);
  });
  
  function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear existing task list
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToList(task));
  }
  
  function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const task = { id: Date.now(), text: taskText, completed: false };
      saveTask(task);
      renderTasks();
      taskInput.value = "";
    }
  }
  
  function addTaskToList(task) {
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.className = "task";
    
    const tickButton = document.createElement("button");
    tickButton.textContent = "✔";
    tickButton.classList.add("tick-btn");
    tickButton.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleTaskCompletion(task.id);
    });
    
    const taskText = document.createElement("div");
    taskText.textContent = task.text;
    taskText.classList.add("task-text");
    if (task.completed) {
      taskText.classList.add("completed"); // Add completed class if task is completed
    }
    taskText.addEventListener("click", () => {
      toggleTaskCompletion(task.id); // Toggle completion status on click
    });
    
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      deleteTask(task.id);
    });
    
    if (task.completed) {
      li.classList.add("completed");
    }
    
    li.appendChild(tickButton);
    li.appendChild(taskText);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  }
  
  function toggleTaskCompletion(taskId) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskIndex = tasks.findIndex(task => task.id == taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      saveTasksToLocalStorage(tasks);
      renderTasks();
    }
  }
  
  function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id != taskId);
    saveTasksToLocalStorage(tasks);
    renderTasks();
  }
  
  function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    saveTasksToLocalStorage(tasks);
  }
  
  function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
