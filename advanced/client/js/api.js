const FETCH_TODO_LIST = "http://localhost:3000/todo";

export const fethcTodoList = async () => {
    const todoListResp = await fetch(FETCH_TODO_LIST);
    const todoList = todoListResp.json()
    return todoList
}