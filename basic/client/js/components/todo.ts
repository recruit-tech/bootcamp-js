import { removeTodoAction, patchTodoAction } from '../flux/index.js'
import store from '../store.js'
import { TodoType } from '../type.js'

class Todo {
  parent: Element
  element: Element
  props: TodoType
  constructor(parent: Element, { id, name, done }: TodoType) {
    this.parent = parent;
    this.element = document.createElement("li");
    this.element.className = "todo-item";
    this.props = { id, name, done };
  }

  mount() {
    const removeButton = this.element.querySelector('.todo-remove-button')
    if(removeButton) {
      removeButton.addEventListener('click', () => {
        store.dispatch(removeTodoAction(this.props.id))
      })
    }

    const checkBox = this.element.querySelector('.todo-toggle')
    if(checkBox) {
      checkBox.addEventListener('click', () => {
        console.log('click toggle', this.props.id)
        store.dispatch(patchTodoAction(this.props))
      })
    }
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
    this.mount()
  }
}

export default Todo;
