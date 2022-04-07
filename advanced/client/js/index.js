import Todo from './domain/todo.js'
const subscribeEvent = () => {
  const registerBtn = document.querySelector("input.todo-form__submit")
  registerBtn.addEventListener('click', (e) => {
    e.preventDefault()
  })
}

const clearExistingTodos = (dom) => {
  while(dom.firstChild){
    dom.removeChild(dom.firstChild);
  }
}

const fetchTodos = async (url) => {
    const res = await fetch(url,{
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => res.json())
    
  return  res.todoList
}

const insertTodo = (dom, todo) => {
  const template = 
  `<label class="todo-toggle__container">
        <input
          data-todo-id="${todo.id}"
          type="checkbox"
          class="todo-toggle"
          ${todo.done? "checked" : ""}
        />
        <span class="todo-toggle__checkmark"></span>
      </label>
      <div class="todo-name"></div>
      <div data-todo-id="${todo.id}" class="todo-remove-button">x</div>
  `
  const li = document.createElement('li')
  li.className = "todo-item";
  li.innerHTML = template;
  li.getElementsByClassName("todo-name")[0].innerText = todo.name
  dom.appendChild(li)
}

const presentTodos = (dom, todos) => {
  todos.forEach(todo => {
      insertTodo(dom, new Todo(todo.id, todo.name, todo.done))
  })
}

const main = () => {
  const serverEndpoint = "http://localhost:3000/todo"
  subscribeEvent();
  const todoListDom = document.querySelector("ul.todos")
  clearExistingTodos(todoListDom)
  fetchTodos(serverEndpoint).then((todos)=>{
    presentTodos(todoListDom, todos)
  })
};

main();
