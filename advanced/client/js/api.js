const API_ENDPOINT = "http://localhost:3000";

const toJson = async (res) => {
  const js = await res.json();
  if (res.ok) {
    return js;
  } else {
    throw new Error(js.message);
  }
};

export const getAllTodo = async () => {
  const resp = await fetch(`${API_ENDPOINT}/todo`);
  return toJson(resp);
};
