//const express = require("express");
import express from "express";

const router = express.Router();

type TodoItem = {
  id : number;
  name : string;
  done : boolean;
};

interface Service{
  getItem() : TodoItem;
}

class Todo implements Service {
  private _todoItem : TodoItem;
  constructor(initialTodo : TodoItem) {
    this._todoItem = initialTodo;
  }

  getItem() {
    return this._todoItem;
  }
}

const todoList : TodoItem[] = [];

router.post("/", (req, res, next) => {
  const id = todoList.length ? todoList[todoList.length - 1].id + 1 : 0;
  const new_item : TodoItem = 
    {
      id : id,
      name : req.body.name,
      done : false
    }

  todoList.push(new_item);
  return res.status(201).send(new_item);
});

router.get("/", (req, res, next) => {
  return res.send({ todoList: todoList });
});

router.patch("/:id", (req, res, next) => {
  const id : number = parseInt(req.params.id, 10);  //こういうパースはよくない気がするなあ...ここでエラー吐かれるもんな...
  const todo : TodoItem | undefined = todoList.find(todo => todo.id == id);
  if (todo === undefined){
    // if undefined << because of no index
    // return HTTP Error 409
    return res.status(409);
  }
  const { name, done } = req.body;
  todo.name = name;
  todo.done = done;
  return res.status(201).send(todo);
});

router.delete("/:id", (req, res, next) => {
  const id : number = parseInt(req.params.id, 10);
  const index : number = todoList.findIndex(todo => todo.id == id);
  todoList.splice(index, 1);
  return res.status(204).send("done");
});

//module.exports = router;
export default router;