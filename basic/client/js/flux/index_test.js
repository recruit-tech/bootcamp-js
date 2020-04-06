import { test } from "../test/runner.js";
import {
  createStore,
  createFetchTodoListAction,
  createAddTodoAction
} from "./index.js";

function todo一覧を取得するアクションをdispatchしたときtodo一覧が更新される() {
  const initialState = { todoList: [] };
  const store = createStore(initialState);
  store.dispatch(createFetchTodoListAction());
  store.subscribe(state => {
    console.assert(initialState !== state.todoList);
  });
}

function todoを追加するアクションをdispatchしたときtodoが追加される() {
  const initialState = { todoList: [] };
  const store = createStore(initialState);
  store.dispatch(createAddTodoAction({ name: "hoge" }));
  store.subscribe(state => {
    console.assert(state.todoList[0].name === "hoge");
    console.assert(!state.todoList[0].done);
  });
}

test(todo一覧を取得するアクションをdispatchしたときtodo一覧が更新される);
test(todoを追加するアクションをdispatchしたときtodoが追加される);
