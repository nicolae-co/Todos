// create an array to store the tasks
let tasks = [];

// get references to the form and task list elements
const form = document.getElementById("add-task-form");
const taskList = document.getElementById("task-list");

// check if there are any tasks in local storage
if (localStorage.getItem("tasks")) {
  // if there are, retrieve them and store them in a tasks array
  tasks = JSON.parse(localStorage.getItem("tasks"))
  renderTasks()
}
// create a function to render the task list
function renderTasks() {
  // clear the task list
  taskList.innerHTML = "";

  // loop through the tasks array
  for (let i = 0; i < tasks.length; i++) {
      // create a new task element
    const task = document.createElement("div");
    task.classList.add("task", "col-12", "text-black", "py-1", "glass-container");
    const checkbox = document.createElement("input");
    checkbox.classList.add("d-none");
    checkbox.type = "checkbox";
    checkbox.id = i;
    checkbox.checked = tasks[i].completed;
    const checkboxText = document.createElement("label");
    checkboxText.classList.add("btn", "btn-success")
    checkboxText.innerText = "Complete";
    checkboxText.htmlFor = i;


    //create a container fot he buttons
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("d-flex", "justify-content-between")

  // create a label for the task
  const label = document.createElement("h3");
    label.innerText =`${i+1}. ${tasks[i].title}`;
    label.classList.add("text-center");
    checkbox.addEventListener("change", () => {
    // toggle the completed flag when the checkbox is checked/unchecked
    tasks[i].completed = !tasks[i].completed;
    renderTasks();
    });
    // if the completed flag is checked, changes the background and hides the completed checkbox
    if (tasks[i].completed) {
      label.classList.add("bg-light", "text-dark");
      checkbox.classList.add("d-none");
      checkboxText.classList.add("d-none");
    }

  // create a delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete", "btn", "btn-danger");
  deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
  deleteButton.addEventListener("click", () => {
      // remove the task when the delete button is clicked
      tasks.splice(i, 1);
      renderTasks();
  });

    
// append the checkbox, label, and delete button to the task element
    btnContainer.appendChild(checkboxText);
    btnContainer.appendChild(checkbox);
    btnContainer.appendChild(deleteButton);
    
    task.appendChild(label);
    task.appendChild(btnContainer);
  

  // append the task element to the task list
  taskList.appendChild(task);
    
  addTaskToLocalStorage(tasks)
}
}

// add a submit event listener to the form
form.addEventListener("submit", event => {
event.preventDefault();

// get the value of the new task input field
const newTaskTitle = document.getElementById("new-task").value;

// add a new task to the array
  tasks.push({
  title: newTaskTitle,
  completed: false
});

// clear the input field and re-render the task list
document.getElementById("new-task").value = "";
renderTasks();
});

// create a function to save the task list to local storage
function addTaskToLocalStorage(value) {
  // convert the tasks array to a JSON string and store it in local storage
  window.localStorage.setItem("tasks",JSON.stringify(value));
}


// render the initial task list
renderTasks();
