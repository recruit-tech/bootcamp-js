import { getAllTodo, createTodo } from "./api.js";

const main = async () => {
  const todo = await getAllTodo();

  const ulElement = document.getElementsByClassName("todos")[0];
  todo.map((t) => {
    const { id, name, done } = t;
    console.log(id, name, done);
    const liElement = makeTodoElement(id, name, done);
    ulElement.appendChild(liElement);
  });

  AddTodo("test");
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
const AddTodo = (new_todo_name) => {
  createTodo(new_todo_name);
};

main();
