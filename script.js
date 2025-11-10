let tasks = [];
const ul = document.getElementById("ul");
const button = document.getElementById("butt");
const li = document.createElement("li")
const display = document.getElementById("display")
const body = document.getElementById("body");

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
    const checkButton = createButton("<i class='fa-regular fa-square-check'></i>")
    li.appendChild(checkButton)
    const deleteButton = createButton("<i class='fa fa-trash-o'></i>");
    deleteButton.classList.add("delete-btn");
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
    if (!(e.target.classList.contains("fa-trash-o")) && !(e.target.classList.contains("delete-btn"))) return;

    if (!confirm("helo")) {
        return
    }

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
    let li = e.target.closest("li");
    let temp = document.querySelector(".chosen");
    if (!li) {
        return;
    }

    if (temp) {
        temp.classList.remove("chosen");
    }

    li.classList.add("chosen");

    let index = Number(li.dataset.index);
    addEventListener("keydown", (e) => {
        if (e.key == "ArrowUp" && index > 0) {
            [tasks[index], tasks[index * 1 - 1]] = [tasks[index * 1 - 1], tasks[index]];
            updateTaskList();
        }
        if (e.key == "ArrowDown" && index < tasks.length - 1) {
            [tasks[index], tasks[index * 1 + 1]] = [tasks[index * 1 + 1], tasks[index]];
            updateTaskList();
        }
    })
    saveTask();
}

ul.addEventListener("click", chooseTask);



function doneTask(e) {
    if (!(e.target.classList.contains("fa-square-check"))) return;
    const li = e.target.closest("li");



    const icon = e.target;
    if (li.classList.contains("done")) {
        li.classList.remove("done");
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
    }
    else {
        li.classList.add("done");
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
    }

}



ul.addEventListener("click", doneTask)


function main() {
    ul.innerText = "";
    renderTask();
}

function renderTask() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    for (let i = 0; i < tasks.length; i++) {

        const li = createListItem(tasks[i], i);
        ul.appendChild(li);
    }
}

function updateTaskList() {
    const taskListItems = ul.querySelectorAll("li");
    tasks.forEach((task, index) => {
        taskListItems[index].dataset.index = index;
        taskListItems[index].querySelector("span").innerHTML = task;
    });
}

main();


button.addEventListener("click", setTasks);