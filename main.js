let tasks=[];
function loadpage(){
    const saved=localStorage.getItem("todo");
    if (saved) {
       tasks= JSON.parse(saved);
       tasks.forEach(display);
    }
}


function addtask() {
    let input = document.getElementById("taskinput");
    let text = input.value.trim();
    if (text === "") {
        alert("please enter a task");
        return;
    }
    const task = {id: Date.now(),text,completed : false};
    tasks.push(task);
    localStorage.setItem("todo",JSON.stringify(tasks));
    display(task);
    input.value = "";
}
function display(task) {
    const li = document.createElement("li");
    const label = document.createElement("span");
    const button = document.createElement("button");

    label.textContent = task.text;

    if (task.completed) {
        label.classList.add("completed");
    }

    button.type = "button";
    button.textContent = task.completed ? "Undo" : "Complete";

    button.onclick = function () {
    tasks = tasks.filter((item) => item.id !== task.id);
    localStorage.setItem("todo", JSON.stringify(tasks));
    li.remove();
};

    li.appendChild(label);
    li.appendChild(button);
    document.getElementById("tasklist").appendChild(li);
}
