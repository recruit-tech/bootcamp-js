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

const REMOVE_TODO_ACTION_TYPE = 'remove item from todo';
export const removeTodoAction = (todoId) => {
  return {   
      type: REMOVE_TODO_ACTION_TYPE,
      payload : todoId,
  }
};


const CLEAR_ERROR = "Clear error from state";
export const clearError = () => ({
  type: CLEAR_ERROR,
  payload: undefined,
});

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
      const url = 'http://localhost:3000/todo/' + payload
      try{
        await fetch(url, {method: 'DELETE'})
        const index = prevState.todoList.findIndex(
          (todo) => todo.id === payload)
        if (index === -1) return;
        const nextTodoList = [...prevState.todoList]
        nextTodoList.splice(index, 1)
        return {todoList : nextTodoList, error : null}
      }catch(err){
        console.error('Something wrong is happen. %o', err)
        return {...prevStore, error : err}
      }
    }

    case CLEAR_ERROR: {
      return { ...prevState, error: null };
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
