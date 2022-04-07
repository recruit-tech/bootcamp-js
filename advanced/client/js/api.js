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
 * @return {Promise<Array>}
 */
export const getAllTodo = async () => {
  const resp = await fetch(`${API_ENDPOINT}/todo`);
  const todo = await toJson(resp);
  return todo.todoList;
};

/**
 * todoを取得
 * @param {string} name
 * @return {Promise<any>}
 */
export const createTodo = async (name) => {
  const resp = await fetch(`${API_ENDPOINT}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  });
  const newTodo = await toJson(resp);
  return newTodo;
};

/**
 * todoを更新
 * @param {string} name
 * @param {number} id
 * @param {boolean} done
 * @return {Promise<any>}
 */
export const updateTodo = async (name, id, done) => {
  const resp = await fetch(`${API_ENDPOINT}/todo/${String(id)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      done: done,
    }),
  });
  const updatedTodo = await toJson(resp);
  return updatedTodo;
};
