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
  const button = e.target.closest("button");
  if (!button) return;

  if (
    !(e.target.classList.contains("fa-trash-o")) &&
    !(e.target.classList.contains("delete-btn"))
  ) return;

  if (!confirm("Biztosan szeretnéd kitörölni?")) return;

  const li = button.closest("li");
  if (!li) return;

  const index = Number(li.dataset.index);

  // törlés a tömbből
  tasks.splice(index, 1);
  saveTask();

  // törlés a DOM-ból
  li.remove();

  // 🔧 itt jön a fontos rész:
  updateTaskList();
}

ul.addEventListener("click", deleteTask);



function chooseTask(e) {
  const li = e.target.closest("li");
  if (!li) return;
  if (li.classList.contains("done")) return;

  // ha a törlés vagy check ikonra kattintunk, ne válasszon ki
  if (e.target.closest("button")) return;

  // előző chosen törlése
  const prevChosen = document.querySelector(".chosen");
  if (prevChosen) prevChosen.classList.remove("chosen");

  // most kijelöljük az új elemet
  li.classList.add("chosen");
}

// csak egyszer adjuk hozzá a nyílkezelést
document.addEventListener("keydown", (e) => {
  const chosen = document.querySelector(".chosen");
  if (!chosen) return; // ha nincs kiválasztott elem, ne csináljon semmit

  const index = Number(chosen.dataset.index);

  if (e.key === "ArrowUp" && index > 0) {
    const newChosen = swapTasks(index, index - 1);
    updateChosen(newChosen);
  }

  if (e.key === "ArrowDown" && index < tasks.length - 1) {
    const newChosen = swapTasks(index, index + 1);
    updateChosen(newChosen);
  }
});

function swapTasks(i, j) {
  // 1️⃣ tömb sorrend csere
  [tasks[i], tasks[j]] = [tasks[j], tasks[i]];

  // 2️⃣ DOM csere
  const lis = ul.querySelectorAll("li");
  const li1 = lis[i];
  const li2 = lis[j];

  const placeholder = document.createElement("div");
  ul.replaceChild(placeholder, li1);
  ul.replaceChild(li1, li2);
  ul.replaceChild(li2, placeholder);

  // 3️⃣ index frissítése
  updateTaskList();
  saveTask();

  // visszaadjuk az új helyen lévő elemet
  return ul.querySelectorAll("li")[j];
}

function updateTaskList() {
  const taskListItems = ul.querySelectorAll("li");

  taskListItems.forEach((li, index) => {
    li.dataset.index = index;
    const span = li.querySelector("span");
    if (span) span.textContent = tasks[index];
  });
}

function updateChosen(newChosen) {
  // az előző chosen class törlése
  const oldChosen = document.querySelector(".chosen");
  if (oldChosen) oldChosen.classList.remove("chosen");

  // az új helyen lévő elem megjelölése
  if (newChosen) newChosen.classList.add("chosen");
}

document.addEventListener("click", chooseTask);




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

main();


button.addEventListener("click", setTasks);