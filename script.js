// Select DOM elements
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todo-list");


// Try to load saved todos from the localStorage (if any)

const savedTodos = localStorage.getItem("todos");
const todos = savedTodos ? JSON.parse(savedTodos) : [];


// function to save todos
function saveTodos (){
    // Save current todos array to localStorage
    localStorage.setItem("todos",JSON.stringify(todos));
    
}
// Create a DOM node for a todo object and append it to the list
function createTodoNode(todo,index)
{
    const todoItem = document.createElement("li")
    // Checkbox to toggle completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;

    checkbox.addEventListener("change",()=>{
        todo.completed = checkbox.checked;

        // Visual feedback - Strikethrough when todos get completed
        textSpan.style.textDecoration = todo.completed ? "line-through": "none";
        saveTodos();
    })
    // Text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = "0 10px";

    if(todo.completed)
    {
        textSpan.style.textDecoration = "line-through";
    }

        // Double click to edit todo
        textSpan.addEventListener("dblclick",(e)=>{
            const newText = prompt("Update todo",todo.text)
            if(newText !== null)
            {
                todo.text = newText.trim();
                textSpan.textContent = todo.text;
                saveTodos();
            }

        })
        // Delete todo
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click",()=>{
            todos.splice(index,1);
            renderTodos()
            saveTodos();
        })
        todoItem.appendChild(checkbox);
        todoItem.appendChild(textSpan)
        todoItem.appendChild(delBtn);
        return todoItem;
}
function addTodo(){
    const text = todoInput.value.trim()
    if(!text)
        return;
    else{
        // Push a new todo object
        todos.push({text,completed:false})
        todoInput.value = "";
        renderTodos()
        saveTodos();
    }
}
addBtn.addEventListener("click",addTodo)
renderTodos();

todoInput.addEventListener("keydown",(e)=>{
    if(e.key == "Enter"){
        addTodo();
    }
})
// Render all the todos from the todos array on the screen
function renderTodos(){
    list.innerHTML = "";

    // Recreate each item in the list
    todos.forEach((todo,index) =>{
        const node = createTodoNode(todo,index);
        list.appendChild(node);
    })
}
