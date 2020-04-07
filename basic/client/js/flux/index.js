/**
 * Dispatcher
 */
class Dispatcher extends EventTarget {
  dispatch() {
    this.dispatchEvent(new CustomEvent("event"));
  }

  subscribe(subscriber) {
    this.addEventListener("event", subscriber);
  }
}

/**
 * Action Creator and Action Types
 */
const FETCH_TODO_ACTION_TYPE = "Fetch todo list from server";
export const createFetchTodoListAction = () => ({
  type: FETCH_TODO_ACTION_TYPE,
  paylaod: undefined,
});

const ADD_TODO_ACTION_TYPE = "A todo addition to store";
export const createAddTodoAction = (todo) => ({
  type: ADD_TODO_ACTION_TYPE,
  payload: todo,
});

const CLEAR_ERROR = "Clear error from state";
export const clearError = () => ({
  type: CLEAR_ERROR,
  payload: undefined,
});

const REMOVE_TODO_ACTION_TYPE = "remove todo from server";
export const removeTodoAction = (todoId) => {
  return {
    type: REMOVE_TODO_ACTION_TYPE,
    payload: todoId,
  };
};

const UPDATE_TODO_ACTION_TYPE = "update todo from server";
export const updateTodoAction = (todo) => {
  return {
    type: UPDATE_TODO_ACTION_TYPE,
    payload: todo
  }
}

/**
 * Store Creator
 */
const api = "http://localhost:3000/todo";

const defaultState = {
  todoList: [],
  error: null,
};

const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

const reducer = async (prevState, { type, payload }) => {
  switch (type) {
    case FETCH_TODO_ACTION_TYPE: {
      try {
        const resp = await fetch(api).then((d) => d.json());
        return { todoList: resp.todoList, error: null };
      } catch (err) {
        return { ...prevState, error: err };
      }
    }
    case ADD_TODO_ACTION_TYPE: {
      const body = JSON.stringify(payload);
      const config = { method: "POST", body, headers };
      try {
        const resp = await fetch(api, config).then((d) => d.json());
        return { todoList: [...prevState.todoList, resp], error: null };
      } catch (err) {
        return { ...prevState, error: err };
      }
    }
    case REMOVE_TODO_ACTION_TYPE: {
      const url = "http://localhost:3000/todo/" + payload;
      try {
        await fetch(url, { method: "DELETE" });
        // TODO: 画面の再描画 (APIの状態とクライアントの状態の同期)
        const index = prevState.todoList.findIndex(
          (todo) => todo.id === payload
        );
        if (index === -1) return;
        const nextTodoList = [...prevState.todoList];
        nextTodoList.splice(index, 1);
        return { todoList: nextTodoList, error: null };
      } catch (err) {
        console.error("なにか問題が起きました %o", err);
        // errを渡してあげるとエラー画面ができる
        return { ...prevState, err};
      }
    }
    case CLEAR_ERROR: {
      return { ...prevState, error: null };
    }
    case UPDATE_TODO_ACTION_TYPE: {
      const body = JSON.stringify(payload);
      console.log("payload", payload);
      const config = { method: "PATCH", body, headers };
      const url = "http://localhost:3000/todo/" + payload.id;
      try {
        await fetch(url, config);
        const index = prevState.todoList.findIndex(
          (todo) => todo.id === payload.id
        );
        if (index === -1) return;
        const nextTodoList = [...prevState.todoList];
        nextTodoList[index] = prevState.todoList[index];
        nextTodoList[index].done = payload.done;
        return { ...prevState, error: null };
      } catch (err) {
        console.error("なにか問題が起きました %o", err);
        // errを渡してあげるとエラー画面ができる
        return { ...prevState, err};
      }
    }
    default: {
      throw new Error("unexpected action type: %o", { type, payload });
    }
  }
};

export function createStore(initialState = defaultState) {
  const dispatcher = new Dispatcher();
  let state = initialState;

  const dispatch = async ({ type, payload }) => {
    console.group(type);
    console.log("prev", state);
    state = await reducer(state, { type, payload });
    console.log("next", state);
    console.groupEnd();
    dispatcher.dispatch();
  };

  const subscribe = (subscriber) => {
    dispatcher.subscribe(() => subscriber(state));
  };

  return {
    dispatch,
    subscribe,
  };
}
