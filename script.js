let tasks = [];
const ul = document.getElementById("ul");
const button = document.getElementById("butt");
const li = document.createElement("li")
const display = document.getElementById("display")

const text = document.getElementById("input");

function setTasks() {
    if (text.value.length === 0 || tasks.includes(text.value)) return;
    tasks.push(text.value);
    saveTask();
    const li = createListItem(text.value, tasks.length - 1);
    ul.appendChild(li);
    text.value = "";


}

text.addEventListener("keypress", (e) => {
    if (e.key === "Enter") setTasks();
    })

function createListItem(task, i) {
    const li = document.createElement("li");
    const text = createText(task);
    li.appendChild(text);
    const checkButton = createButton("<i class='fa-solid fa-check'></i>")
    li.appendChild(checkButton)
    const deleteButton = createButton("<i class='fa fa-trash-o'></i>");
    li.appendChild(deleteButton);
    li.dataset.index = i;


    return li;
}

function createText(task) {
    const text = document.createElement("span");
    text.innerHTML = task;
    return text;
}



function createButton(text) {
    const tempButton = document.createElement("button");
    tempButton.innerHTML = text;


    return tempButton;

}

function saveTask() {
    return localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(e) {


    const li = e.target.closest("button");
    if (!e.target.classList.contains("fa-trash-o")) return;

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
    if (!li) {
        return;
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
    saveTask();
}

ul.addEventListener("click", chooseTask);


function main() {
    // ul.innerText = "";
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (let i = 0; i < tasks.length; i++) {

        const li = createListItem(tasks[i], i);
        ul.appendChild(li);
    }
}

main();


button.addEventListener("click", setTasks);