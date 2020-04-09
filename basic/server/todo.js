"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var Todo = /** @class */ (function () {
    function Todo(id, name, done) {
        this.id = id;
        this.name = name;
        this.done = done;
    }
    Todo.prototype.toJSON = function () {
        return {
            id: this.id,
            name: this.name,
            done: this.done
        };
    };
    return Todo;
}());
var todoList = [];
router.post("/", function (req, res, next) {
    var id = todoList.length ? todoList[todoList.length - 1].id + 1 : 0;
    var item = new Todo(id, req.body.name, false);
    todoList.push(item);
    return res.status(201).send(item);
});
router.get("/", function (req, res, next) {
    return res.send({ todoList: todoList });
});
router.patch("/:id", function (req, res, next) {
    var id = parseInt(req.params.id);
    var todo = todoList.find(function (todo) { return todo.id === id; });
    if (!todo)
        return res.status(404).send("something went wrong");
    var _a = req.body, name = _a.name, done = _a.done;
    todo.name = name;
    todo.done = done;
    return res.status(201).send(todo);
});
router.delete("/:id", function (req, res, next) {
    var id = parseInt(req.params.id);
    var index = todoList.findIndex(function (todo) { return todo.id == id; });
    todoList.splice(index, 1);
    return res.status(204).send("done");
});
exports.default = router;
