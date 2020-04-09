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
type FetchTodoAction = {
  type : typeof FETCH_TODO_ACTION_TYPE,
  payload: undefined,
}
export const createFetchTodoListAction = () => {
  const obj : FetchTodoAction = {FETCH_TODO_ACTION_TYPE, undefined}
  return obj
};

const ADD_TODO_ACTION_TYPE = "A todo addition to store";
type todo = {
  id : number,
  name : string,
  done : boolean,
}
type AddTodoAction = {
  type : typeof ADD_TODO_ACTION_TYPE,
  payload: todo,
}
export const createAddTodoAction = (todo) => {
  const obj : AddTodoAction = {ADD_TODO_ACTION_TYPE, todo};
  return obj
};


const REMOVE_TODO_ACTION_TYPE = 'remove item from todo';
type RemoveTodoAction = {
  type : typeof REMOVE_TODO_ACTION_TYPE,
  payload : number,
}
export const removeTodoAction = (todoId) => {
  const obj : RemoveTodoAction = {REMOVE_TODO_ACTION_TYPE, todoId}
  return obj
};

const DONE_TODO_ACTION_TYPE = 'done status to todo';
type DoneTodoAction = {
  type : typeof DONE_TODO_ACTION_TYPE,
  payload : todo
}
export const checkTodoAction = (todo) =>{
  const obj : DoneTodoAction = {DONE_TODO_ACTION_TYPE, todo}
  return obj
}


const CLEAR_ERROR = "Clear error from state";
type ClearError = {
  type : typeof CLEAR_ERROR,
  payload : undefined
}
export const clearError = () => {
  const obj : ClearError = {CLEAR_ERROR, undefined}
  return obj
};

type Action = FetchTodoAction | AddTodoAction | RemoveTodoAction | DoneTodoAction | ClearError
/**
 * Store Creator
 */
const api : string = "http://localhost:3000/todo";

type State = {
  todoList : todo[],
  error : string | null,
}

const defaultState : State = {
  todoList = [],
  error = null,
};

const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

const reducer = async (prevState : State, action : Action) => {
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
      const url = 'http://localhost:3000/todo/' + action.payload
      try{
        await fetch(url, {method: 'DELETE'})
        const index : number = prevState.todoList.findIndex(
          (todo) => todo.id as number === action.payload)
        if (index === -1) return;
        const nextTodoList = [...prevState.todoList]
        nextTodoList.splice(index, 1)
        return {todoList : nextTodoList, error : null}
      }catch(err){
        console.error('Something wrong is happen. %o', err)
        return {...prevStore, error : err}
      }
    }

    case DONE_TODO_ACTION_TYPE: {
      const url = 'http://localhost:3000/todo/' + payload.id
      const body = JSON.stringify(payload);
      try{
        payload.done = !payload.done
        await fetch(url, {method: 'PATCH' , body, headers})
        const index : number = prevState.todoList.findIndex(
          (todo) => todo.id === payload.id)
        if (index === -1) return;
        const nextTodoList = [...prevState.todoList]
        nextTodoList[index].done = !prevState.todoList[index].done
        return {todoList : nextTodoList, error : null}
      }
      catch(err){
        console.error('Something wrong is happen. %o', err)
        return {...prevState, error : err}
      }
    }

    case CLEAR_ERROR: {
      return { ...prevState, error: null };
    }
  }
};

export function createStore(initialState = defaultState) {
  const dispatcher = new Dispatcher();
  let state = initialState;

  const dispatch = async (action) => {
    console.group(action.type);
    console.log("prev", state);
    state = await reducer(state, action);
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
