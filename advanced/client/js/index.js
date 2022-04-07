import { getAllTodo } from "./api.js";

const main = async () => {
  // todoを取得して描画
  const todo = await getAllTodo();
  // console.log(todo);

  const ulElement = document.getElementsByClassName("todos")[0];
  todo.map((t) => {
    const { id, name, done } = t;
    console.log(id, name, done);
    // console.log(makeTodoItem(id, name, done));
    const liElement = makeTodoItem(id, name, done);
    ulElement.appendChild(liElement);
  });
};

/**
 * todoを取得
 * @return {HTMLElement}
 */
const makeTodoItem = (id, todo_name, done) => {
  const liElement = document.createElement("li");
  liElement.className = "todo-item";

  // ここからlabel
  const labelElement = document.createElement("label");
  labelElement.className = "todo-toggle__container";

  const inputElement = document.createElement("input");
  inputElement.className = "todo-toggle";
  if (done) {
    inputElement.value = "checked";
  }
  inputElement.setAttribute("data-todo-id", String(id));
  inputElement.setAttribute("type", "checkbox");

  const spanElement = document.createElement("span");
  spanElement.className = "todo-toggle__checkmark";

  labelElement.appendChild(inputElement);
  labelElement.appendChild(spanElement);
  // ここまでlabel

  const divTodoNameElement = document.createElement("div");
  divTodoNameElement.className = "todo-name";
  divTodoNameElement.textContent = todo_name;

  const divRemoveButton = document.createElement("div");
  divRemoveButton.className = "todo-remove-button";
  divRemoveButton.setAttribute("data-todo-id", String(id));
  divRemoveButton.textContent = "x";

  liElement.appendChild(labelElement);
  liElement.appendChild(divTodoNameElement);
  liElement.appendChild(divRemoveButton);

  return liElement;
};

main();
