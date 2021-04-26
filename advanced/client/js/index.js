import { fethcTodoList, createTodo } from "./api.js";

const main = async () => {
  // fetch list
  try {
    const todoList = fethcTodoList();
    console.debug(todoList);
  } catch (e) {
    
  }
  // update dom

  // create todo
  const createTodoForm = document.forms.createTodo;
  createTodoForm.addEventListener('submit', async () => {
    try {
      await createTodo(createTodoForm.elements.name.value)
      // refetch
    } catch (e) {
      console.error(e)
    }
  });
};

main();
