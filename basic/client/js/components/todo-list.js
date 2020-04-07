import Todo from "./todo.js";

class TodoList {
  constructor(parent, { todoList }) {
    this.parent = parent;
    this.element = document.createElement("ul");
    this.element.className = "todo-list";
    this.props = { todoList };
  }
  mount() {
    const removeButton = this.element.querySelector(".todo-remove-button")
    const deleteURL =  "http://localhost:3000/todo/"
    const options =  {
      method: "DELETE",
    }
    removeButton.addEventListener("click", ()=>{
      console.log("clicked,%o",this.props.id)
      
      fetch(deleteURL + this.props.id, options).then(() => {
        console.log('removed')
      }).catch(() => {
        console.log('while removing somothing wrong')
      })
    })
    
  }
  render() {
    // 二回目以降のレンダリングでは
    // 前回の DOM を破棄して 子要素すべてを rendering し直す
    if (this.parent.children.length !== 0) {
      for (const child of this.parent.children) {
        this.parent.removeChild(child);
      }
    }

    this.props.todoList.map(todo => {
      new Todo(this.element, todo).render();
    });

    this.parent.appendChild(this.element);
    this.mount()
  }
}

export default TodoList;
