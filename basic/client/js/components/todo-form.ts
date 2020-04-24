import store from "../store.js";
import { createAddTodoAction } from "../flux/index.js";

class TodoForm {
  button: HTMLButtonElement
  form: HTMLInputElement
  constructor() {
    const button = document.querySelector(".todo-form__submit");
    const form = document.querySelector(".todo-form__input");
    if(!button) throw new Error('no button')
    if(!form) throw new Error('no form')
    this.button = button as HTMLButtonElement
    this.form = form as HTMLInputElement
  }

  mount() {
    this.button.addEventListener("click", e => {
      e.preventDefault();
      store.dispatch(createAddTodoAction({ name: this.form.value }));
      this.form.value = "";
    });
  }
}

export default TodoForm;
