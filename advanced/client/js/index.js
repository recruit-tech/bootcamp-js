import { getAllTodo, createTodo } from "./api.js";

const main = async () => {
  const todo = await getAllTodo();
  const ulElement = document.getElementsByClassName("todos")[0];
  todo.map((t) => {
    const { id, name, done } = t;
    const liElement = makeTodoElement(id, name, done);
    ulElement.appendChild(liElement);
  });

  // submitイベント
  const submitButton = document.getElementById("submit-button");
  submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const inputText = document.getElementById("name").value;

    if (inputText === "") return;

    const newTodoElement = await addTodo(inputText);
    document.getElementsByClassName("todos")[0].appendChild(newTodoElement);
    document.getElementById("name").value = "";

    return;
  });
};

/**
 * todoを取得
 * @return {HTMLElement}
 */
const makeTodoElement = (id, todo_name, done) => {
  const liElement = document.createElement("li");
  liElement.className = "todo-item";

  liElement.innerHTML = `
      <label class="todo-toggle__container">
        <input
          data-todo-id="${id}"
          type="checkbox"
          class="todo-toggle"
          value="checked"
          ${done ? "checked" : ""}
        />
        <span class="todo-toggle__checkmark"></span>
      </label>
      <div class="todo-name">${todo_name}</div>
      <div data-todo-id="${id}" class="todo-remove-button">x</div>
    `;

  return liElement;
};

/**
 * todoを作成
 * @return {HTMLElement}
 */
const addTodo = async (new_todo_name) => {
  const newTodo = await createTodo(new_todo_name);
  console.log(newTodo);
  const { id, name, done } = newTodo;
  return makeTodoElement(id, name, done);
};

main();
