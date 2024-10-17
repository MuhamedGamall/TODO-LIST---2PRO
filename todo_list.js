/* Add All Variables */
let myInput = document.querySelector("input");
let add = document.querySelector(".add");
let tasksContent = document.querySelector(".myTasks");
let noTasksMessage = document.querySelector(".no-tasks-message");
let taskCount = document.querySelector(".task-count span");
let taskCompleted = document.querySelector(".task-completed span");
let deleteAllBtn = document.querySelector(".deleteAll");

let arrayOfTasks = [];

window.onload = myInput.focus();
add.onclick = () => addTaskToArray();

//function add task to array
function addTaskToArray() {
  if (myInput.value.trim()) {
    const task = { title: myInput.value, id: Date.now(), mood: "no" };
    arrayOfTasks.push(task);
    addTaskToBage(arrayOfTasks);
    addTaskToLocalstorage(arrayOfTasks);
    myInput.value = "";
  }
}
function showBtns() {
  if (arrayOfTasks.length == 0) {
    deleteAllBtn.style.display = "none";
    tasksContent.style.display = "none";
  } else {
    tasksContent.style.display = "block";
    deleteAllBtn.style.display = "block";
  }
}
//function add task to Bage
function addTaskToBage(allData) {
  showBtns();
  let drowData = allData.map((el, i) => {
    return `
    <span class="task-box ${el.mood == "yes" ? "finished" : ""}" id='${
      el.id
    } ' > 
    ${el.title} 
    <i class=" delete  fa-solid fa-trash-can"></i>
    </span>`;
  });
  tasksContent.innerHTML = drowData.join("");
  calcTasks();
}

//function add task to localstoage
function addTaskToLocalstorage(allData) {
  localStorage.setItem("tasks", JSON.stringify(allData));
}
function checkLocalstoage() {
  if (localStorage.tasks) {
    let tasks = JSON.parse(localStorage.tasks);
    arrayOfTasks = tasks;
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
    addTaskToBage(arrayOfTasks);
  }
}
checkLocalstoage();

//function delete All tasks
deleteAllBtn.onclick = () => deleteAll();
function deleteAll() {
  if (confirm("Are You Sure You Delete All The Tasks !!")) {
    arrayOfTasks.splice(0);
    localStorage.clear();
    addTaskToBage(arrayOfTasks);
    deleteAllBtn.style.display = "none";
    tasksContent.style.display = "none";
    calcTasks();
  }
}

//function delete task

document.addEventListener("click", deleteTask);
function deleteTask(e) {
  let element = e.target.parentElement;
  if (e.target.classList.contains("delete")) {
    element.remove();
    arrayOfTasks = arrayOfTasks.filter((el) => el.id != element.id);
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  }
  calcTasks();
  showBtns();
}
// function calculate all task

function calcTasks() {
  taskCount.innerHTML = arrayOfTasks.length;
  taskCompleted.innerHTML = arrayOfTasks.filter(
    (el) => el.mood == "yes"
  ).length;
}
calcTasks();

document.addEventListener("click", calcFinish);
function calcFinish(event) {
  taskCompleted.innerHTML = arrayOfTasks.filter(
    (el) => el.mood == "yes"
  ).length;
  if (event.target.classList.contains("task-box")) {
    let chossen = arrayOfTasks.find((el) => el.id == event.target.id);
    if (chossen.mood == "yes") {
      chossen.mood = "no";
    } else {
      chossen.mood = "yes";
    }
    localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
    addTaskToBage(arrayOfTasks);
  }
}
