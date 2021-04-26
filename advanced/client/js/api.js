const FETCH_TODO_LIST = "http://localhost:3000/todo";
const CREATE_TODO = "http://localhost:3000/todo";

export const fethcTodoList = async () => {
    const todoListResp = await fetch(FETCH_TODO_LIST);
    const todoList = todoListResp.json()
    return todoList
}

export const createTodo = async (name) => {
    const resp = await fetch(CREATE_TODO,
        {
            method: "POST",
            body: JSON.stringify({name})
        })
    return resp.json()
}