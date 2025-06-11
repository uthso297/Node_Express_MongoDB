"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("../config/mongodb");
const mongodb_2 = require("mongodb");
exports.todoRouter = express_1.default.Router();
// const filepath = path.join(__dirname, "../../../db/todo.json")
exports.todoRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log({ req, res });
    // console.log("tsc -w,nodemon");
    // const data = fs.readFileSync(filepath, { encoding: 'utf8' })
    // res.json(data)
    const db = yield mongodb_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    const cursor = yield collection.find();
    const todos = yield cursor.toArray();
    // res.send(todos)
    res.json(todos);
}));
exports.todoRouter.post('/create-todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority } = req.body;
    // console.log(title, body);
    const db = yield mongodb_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    // const todos = await collection.insertOne({
    //     title: "MongoDB",
    //     description: "Learning Mongodb",
    //     priority: "High",
    //     isCompleted: false
    // })
    yield collection.insertOne({
        title: title,
        description: description,
        priority: priority,
        isCompleted: false
    });
    const cursor = yield collection.find();
    const todos = yield cursor.toArray();
    console.log(todos);
    res.json(todos);
}));
exports.todoRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // params id is string
    console.log(req.params.id);
    const id = req.params.id;
    const query = { _id: new mongodb_2.ObjectId(id) };
    console.log(query);
    const db = yield mongodb_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    const cursor = yield collection.find(query);
    const todo = yield cursor.toArray();
    console.log(todo);
    res.send(todo);
}));
exports.todoRouter.put("/update-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongodb_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    const { title, description, priority, isCompleted } = req.body;
    const filter = { _id: new mongodb_2.ObjectId(id) };
    const updatedTodo = yield collection.updateOne(filter, { $set: { title, description, priority, isCompleted } }, { upsert: true });
    res.json(updatedTodo);
}));
exports.todoRouter.delete('/delete-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // const query = { _id: new ObjectId(id) }
    // console.log(query);
    const db = yield mongodb_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    // const result = await collection.deleteOne(query)
    const result = yield collection.deleteOne({ _id: new mongodb_2.ObjectId(id) });
    res.send(result);
}));
