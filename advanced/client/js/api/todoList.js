const FETCH_TODO_LIST = "http://localhost:3000/todo";
const CREATE_TODO = "http://localhost:3000/todo";

export const fetchTodoList = async () => {
    const todoListResp = await fetch(FETCH_TODO_LIST);
    return todoListResp.json()
}

export const createTodo = async (name) => {
    const resp = await fetch(CREATE_TODO,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name})
        })
    return resp.json()
}