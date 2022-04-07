import { createAddTodoAction } from "../flux/index.js";
import store from "../store.js";

class TodoForm {
  constructor() {
    this.button = document.querySelector(".todo-form__submit");
    this.form = document.querySelector(".todo-form__input");
  }

  mount() {
    // TODO:
    // ここに 作成ボタンが押されたら todo を作成するような処理を追記する
    this.button.addEventListener("click", function (event) {
      console.log("clicked!");
      store.dispatch(createAddTodoAction('todo name'));
      event.preventDefault();
    });
  }
}

export default TodoForm;
