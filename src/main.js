const todoValue = document.getElementById('input');
const listItem = document.getElementById('list-items');
const alertMessage = document.getElementById('alertMessage');
let todoData = JSON.parse(localStorage.getItem("todoData")) | [];
if (!todoData) {
  todoData=[];
}

readToDoItems();
function readToDoItems() {
    console.log(todoData);
    todoData.forEach(element => {
        let li = document.createElement("li");
        let style ="";
        if(element.status){
            style="style='text-decoration: line-through'"
        }
        const todoItems = `<div ${style} ondblclick="CompletedItem(this)">${element.item}div>`;
        li.innerHTML = todoItems;
        listItems.appendChild(li);
    });
}

function createToDo() {
    console.log(todoValue.value);
    if (todoValue.value === "") {
        alertMessage.innerText ="Put some task!";
        todoValue.focus();
        return; 
    }

    let li = document.createElement("li");
    const todoItems = `<div ondblclick="CompletedItem(this)">${todoValue.value}</div><div><img class="trash" onclick="DeleteTodoItem(this)" src="/src/img/trash.png"/></div>`;

    li.innerHTML = todoItems;
    listItem.appendChild(li);
    
    if (!todoData) {
        todoData=[];
    }
    let dataItem = {item: todoValue.value, status: false};
    console.log(dataItem);
    todoData.push(dataItem);
    localStorage.setItem("todoData", JSON.stringify(todoData));
    
    todoValue.value = "";
}

function CompletedItem(e) {
    if (e.style.textDecoration === "line-through") {
        e.style.textDecoration = "";

        todoData.forEach((element)=>{
            if(e.parentElement.querySelector("div").innerText.trim()== element.item) {
                element.status= true;
            }
        })
    } else {
        e.style.textDecoration = "line-through";
    }
}

function DeleteTodoItem(e) {
    const item = e.closest("li"); // Encontra o elemento <li> mais próximo
    let deleteValue = item.querySelector("div").innerHTML;
    if (confirm(`Are you sure that you want to delete this: "${deleteValue}"?`)) {
        item.remove();

        todoData.forEach((element)=>{
            if(element.item == deleteValue.trim()){
                todoData.splice(element, 1);
            }
        });
        setLocalStore();
    }
}

function setLocalStore(params) {
    localStorage.setItem("todoData", JSON.stringify(todoData));
}