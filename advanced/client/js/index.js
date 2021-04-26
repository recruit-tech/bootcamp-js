import { fetchTodoList, createTodo } from "./api/todoList.js";
import { createTodoItemElList } from "./domCreator/todoList.js";


const createTodoAndUpdateList = async (event) => {
  event.preventDefault()
  try {
    // post
    const createTodoForm = document.forms.createTodo;
    await createTodo(createTodoForm.elements.name.value)
    createTodoForm.elements.name.value = ""
  } catch (e) {
    console.error(e)
  }

  try {
    // refetch
    const resp = await fetchTodoList();
    // create elements
    const todoItemElList = createTodoItemElList(resp.todoList);
    // update dom 
    const todoListEl = document.getElementById("todo-list")
    while (todoListEl.firstChild) {
      todoListEl.removeChild(todoListEl.firstChild);
    }    
    todoItemElList.forEach(el => {
      todoListEl.appendChild(el)
    })
  } catch (e) {
    console.error(e)
  }
}

const init = async () => {
  try {
    // fetch
    const resp = await fetchTodoList();
    // create elements
    const todoItemElList = createTodoItemElList(resp.todoList);
    // update dom 
    const todoListEl = document.getElementById("todo-list")
    todoItemElList.forEach(el => {
      todoListEl.appendChild(el)
    })
  } catch (e) {
    
  }
}

const main = () => {
  init();

  // set create event
  const createTodoForm = document.forms.createTodo;
  createTodoForm.addEventListener('submit', createTodoAndUpdateList);
};

main();

// テストしたい
// todoList渡したら正しくDOM作られる？？
// todo一個で正しいノード(チェックボックスのチェックや、name反映されてる？)作られる？？
// submit押したらイベント発火される？？