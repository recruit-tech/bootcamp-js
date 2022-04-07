const API_ENDPOINT = "http://localhost:3000";

const toJson = async (res) => {
  const js = await res.json();
  if (res.ok) {
    return js;
  } else {
    throw new Error(js.message);
  }
};

/**
 * todoを取得
 * @return {Array}
 */
export const getAllTodo = async () => {
  const resp = await fetch(`${API_ENDPOINT}/todo`);
  const todo = await toJson(resp);
  return todo.todoList;
};
