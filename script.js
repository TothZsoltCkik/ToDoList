let tasks = [];
const ul = document.getElementById("ul");
const button = document.getElementById("butt");
const li = document.createElement("li")


function setTasks() {
    const text = document.getElementById("input");
    if (text.value.length === 0 || tasks.includes(text.value)) return;
    tasks.push(text.value);
    saveTask();
    const li = createListItem(text.value, tasks.length - 1);
    ul.appendChild(li);
    text.value = "";

}

function createListItem(task, i) {
    const li = document.createElement("li");
    const text = createText(task);
    li.appendChild(text);
    const deleteButton = createButton(task);
    li.appendChild(deleteButton);
    li.dataset.index = i;


    return li;
}

function createText(task) {
    const text = document.createElement("span");
    text.innerHTML = task;
    return text;
}

function createButton() {
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fa fa-trash-o' style='font-size:36px'></i>";


    return deleteButton;

}

function saveTask() {
    return localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(e) {


    const li = e.target.closest("button");

    if (!li) {
        return;
    }

    li.parentElement.remove();

    const index = li.dataset.index;
    tasks.splice(index, 1);
    saveTask();

}
ul.addEventListener("click", deleteTask);



function chooseTask(e) {
    const li = e.target.closest("li");  
    const temp = document.querySelector(".chosen")
    if (!temp || li) {
        li.classList.add("chosen");
        
    }
    
    if (temp) {
        temp.classList.remove("chosen")    
    }
    
    const index = li.dataset.index;
    if (li.classList.contains("chosen")) {
        addEventListener("keydown", (e) => {
            if (e.key == "ArrowUp" && !tasks[0]) {
                [tasks[index], tasks[Number(index) - 1]] = [tasks[Number(index) - 1], tasks[index]];
            }
            if (e.key == "ArrowDown" && !tasks[tasks.length - 1]) {
                [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
            }
        } )
    }
}

document.addEventListener("click", chooseTask);


function main() {
    ul.innerText = "";
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (let i = 0; i < tasks.length; i++) {

        const li = createListItem(tasks[i], i);
        ul.appendChild(li);
    }
}

main();


button.addEventListener("click", setTasks);