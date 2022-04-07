import { getAllTodo, createTodo, updateTodo } from "./api.js";

const main = async () => {
  await initTodo();

  // submitイベント
  const submitButton = document.getElementById("submit-button");
  submitButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const inputText = document.getElementById("name").value;

    if (inputText === "") return;

    await createTodo(inputText);
    await initTodo();
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
 * todoを初期化
 */
const initTodo = async () => {
  const ulElement = document.getElementsByClassName("todos")[0];
  ulElement.innerHTML = "";
  const todo = await getAllTodo();
  todo.map((t) => {
    const { id, name, done } = t;
    const liElement = makeTodoElement(id, name, done);
    ulElement.appendChild(liElement);

    const inputElement = liElement.firstElementChild.firstElementChild;
    inputElement.addEventListener("change", async (e) => {
      const newDone = e.target.checked;
      await updateTodo(name, id, newDone);
    });
  });
};

main();
