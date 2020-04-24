import { TodoType } from '../type.js'

// ここで全部typeを定義すれば、全て行き渡る
/**
 * Dispatcher
 */
class Dispatcher extends EventTarget {
  dispatch() {
    this.dispatchEvent(new CustomEvent("event"));
  }

  subscribe(subscriber: () => void) {
    this.addEventListener("event", subscriber);
  }
}

/**
 * Action Creator and Action Types
 */
const FETCH_TODO_ACTION_TYPE = "Fetch todo list from server";
type FetchTodoAction = {
  type: typeof FETCH_TODO_ACTION_TYPE
  payload: undefined
}
export const createFetchTodoListAction:() => FetchTodoAction = () => ({
  type: FETCH_TODO_ACTION_TYPE,
  payload: undefined,
});

const ADD_TODO_ACTION_TYPE = "A todo addition to store";
type AddTodoAction = {
  type: typeof ADD_TODO_ACTION_TYPE,
  payload: { name: string }
}
export const createAddTodoAction: (todo: { name: string }) => AddTodoAction = (todo) => ({
  type: ADD_TODO_ACTION_TYPE,
  payload: todo,
});

const REMOVE_TODO_ACTION_TYPE = "remove todo from server"
type RemoveTodoAction = {
  type: typeof REMOVE_TODO_ACTION_TYPE,
  payload: number
}
export const removeTodoAction: (todoId: number) => RemoveTodoAction = (todoId) => ({
  type: REMOVE_TODO_ACTION_TYPE,
  payload: todoId
})

const PATCH_TODO_ACTION_TYPE = "patch todo from server"
type PatchTodoAction = {
  type: typeof PATCH_TODO_ACTION_TYPE,
  payload: TodoType
}
export const patchTodoAction: (todo: TodoType) => PatchTodoAction = (todo) => ({
  type: PATCH_TODO_ACTION_TYPE,
  payload: todo
})

const CLEAR_ERROR = "Clear error from state";
type ClearError = {
  type: typeof CLEAR_ERROR,
  payload: undefined
}
export const clearError: () => ClearError = () => ({
  type: CLEAR_ERROR,
  payload: undefined,
});

type Actions = FetchTodoAction | AddTodoAction | RemoveTodoAction | PatchTodoAction | ClearError

/**
 * Store Creator
 */

 type State = {
   todoList: TodoType[],
   error?: any
 }

const api = "http://localhost:3000/todo";

const defaultState: State  = {
  todoList: [],
  error: undefined,
};

const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

const reducer = async (prevState: State, action: Actions) => {
  switch (action.type) {
    case FETCH_TODO_ACTION_TYPE: {
      try {
        const resp = await fetch(api).then((d) => d.json());
        return { todoList: resp.todoList, error: null };
      } catch (err) {
        return { ...prevState, error: err };
      }
    }
    case ADD_TODO_ACTION_TYPE: {
      const body = JSON.stringify(action.payload);
      const config = { method: "POST", body, headers };
      try {
        const resp = await fetch(api, config).then((d) => d.json());
        return { todoList: [...prevState.todoList, resp], error: null };
      } catch (err) {
        return { ...prevState, error: err };
      }
    }
    case REMOVE_TODO_ACTION_TYPE: {
      const id = action.payload
      const url = api + '/' + action.payload
      try{
        const resp = await fetch(url, { method: 'DELETE' }).then((d) => d.json());
        const index = prevState.todoList.findIndex(todo => todo.id === id)
        if(index === -1) return prevState
        const nextTodoList = [...prevState.todoList]
        nextTodoList.splice(index, 1)
        return { todoList: nextTodoList, error: null }
      } catch (err) {
        return {...prevState, error: err}
      }
    }
    case PATCH_TODO_ACTION_TYPE: {
      const { id, ...body } = action.payload
      action.payload.done = !action.payload.done
      try {
        const resp = await fetch(`${api}/${id}`, { 
          method: 'PATCH', 
          body: JSON.stringify(action.payload), 
          headers
        }).then((d) => d.json())
        const idx = prevState.todoList.findIndex(todo => todo.id === id)
        if(idx === -1) return prevState  
        const nextTodoList = prevState.todoList.concat();
        nextTodoList[idx] = resp;
        return { todoList: nextTodoList, error: null }
      } catch (err) {
        return { ...prevState, error: err };
      }
    }
    case CLEAR_ERROR: {
      return { ...prevState, error: null };
    }
    default: {
      throw new Error("unexpected action type: %o");
    }
  }
};

export function createStore(initialState = defaultState) {
  const dispatcher = new Dispatcher();
  let state = initialState;

  const dispatch = async (action: Actions) => {
    console.group(action.type);
    console.log("prev", state);
    state = await reducer(state, action);
    console.log("next", state);
    console.groupEnd();
    dispatcher.dispatch();
  };

  const subscribe = (subscriber: (state: State) => void) => {
    dispatcher.subscribe(() => subscriber(state));
  };

  return {
    dispatch,
    subscribe,
  };
}
