export const createTodoItem = (todo) => {
    const item = document.createElement("li")
    item.classList.add("todo-item");
    const label = document.createElement("label")
    label.classList.add("todo-toggle__container");
    const checkBox = document.createElement("input")
    checkBox.dataset.todoId = todo.id;
    checkBox.classList.add("todo-toggle");
    checkBox.value = todo.done;
    checkBox.checked = todo.done;
    checkBox.type = "checkbox";
    const span = document.createElement("span")
    span.classList.add("todo-toggle__checkmark");
    label.appendChild(checkBox)
    label.appendChild(span)
    item.appendChild(label)
    const todoNameDiv = document.createElement("div")
    todoNameDiv.classList.add("todo-name");
    todoNameDiv.appendChild(document.createTextNode(todo.name ? todo.name : "-"))
    item.appendChild(todoNameDiv)
    const removeButton = document.createElement("div")
    removeButton.classList.add("todo-remove-button");
    removeButton.appendChild(document.createTextNode("x"))
    removeButton.dataset.todoId = todo.id;
    item.appendChild(removeButton)
    return item
  }

export const createTodoItemElList = (todoList) => {
    const todoItemElList = [];
    todoList.forEach((todo) => {
        const todoItem = createTodoItem(todo);
        todoItemElList.push(todoItem);
      })
    return todoItemElList;
}