import { getAllTodo } from "./api.js";

const main = async () => {
  const todo = await getAllTodo();
  console.log({ todo });
};

main();
