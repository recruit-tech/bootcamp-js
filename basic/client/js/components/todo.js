import { removeTodoAction, updateTodoAction } from "../flux/index.js";
import store from "../store.js";

class Todo {
  constructor(parent, { id, name, done }) {
    this.parent = parent;
    this.element = document.createElement("li");
    this.element.className = "todo-item";
    this.props = { id, name, done };
  }

  mount() {
    const removeButton = this.element.querySelector('.todo-remove-button');
    removeButton.addEventListener('click', ()=>{
      // アクションを呼ぶ
      store.dispatch(removeTodoAction(this.props.id));
    });
    const checkBox = this.element.querySelector('.todo-toggle');
    checkBox.addEventListener('change', (event)=>{
      const payload = { ...this.props };
      payload.done = event.target.checked;
      console.log(payload.done);
      store.dispatch(updateTodoAction(payload));
    });
  }

  render() {
    const { id, name, done } = this.props;
    this.element.innerHTML = `
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
      <div class="todo-name">${name}</div>
      <div data-todo-id="${id}" class="todo-remove-button">x</div>
    `;
    this.parent.appendChild(this.element);
    this.mount();
  }
}

export default Todo;
