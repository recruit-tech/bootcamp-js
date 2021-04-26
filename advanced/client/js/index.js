import { fethcTodoList } from "./api.js";

const main = async () => {
  // fetch list
  try {
    const todoList = fethcTodoList();
    console.debug(todoList);
  } catch (e) {
    console.error(e)
  }
  // update dom
};

main();
