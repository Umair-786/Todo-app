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
    const task = {id: Date.now(),text};
    tasks.push(task);
    localStorage.setItem("todo",JSON.stringify(tasks));
    display(task);
    input.value = "";
}
function display(task){
    const li = document.createElement("li");
    li.textContent = task.text;
    li.onclick = function() { this.remove();
    tasks=tasks.filter(t => t.id !== task.id);
        localStorage.setItem("todo",JSON.stringify(tasks));
    }
    document.getElementById("tasklist").appendChild(li);
    
}
