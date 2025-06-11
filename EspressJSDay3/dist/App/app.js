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
// const express = require('express')
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const todos_router_1 = require("./Todos/todos.router");
app.use(express_1.default.json());
app.use('/todos', todos_router_1.todoRouter);
// const filepath = path.join(__dirname, "../../db/todo.json")
// console.log(filepath);
// app.get('/', (req: Request, res: Response) => {
//     // console.log({ req, res });
//     // console.log("tsc -w,nodemon");
//     res.send('Welcome to todos App!!!')
// })
app.get('/', (req, res, next) => {
    console.log({
        url: req.url,
        method: req.method,
        header: req.header
    });
    next();
}, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send('Welcome to Todos App');
    }
    catch (error) {
        next(error);
    }
}));
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});
app.use((error, req, res, next) => {
    if (error) {
        console.log("error", error);
        res.status(400).json({ message: "Something went wrong from global error handler", error });
    }
});
// app.get('/todos/:title', (req: Request, res: Response) => {
//     // console.log({ req, res });
//     // console.log("tsc -w,nodemon");
//     const data = fs.readFileSync(filepath, { encoding: 'utf8' })
//     // console.log(data);
//     // res.send('Welcome to todos App!!!')
//     // query :
//     // http://localhost:5000/todos?title=prisma&body=learning prisma
//     // http://localhost:5000/todos/prisma?body=learning prisma
//     // '/todos/:title/:body' => http://localhost:5000/todos/mongodb/learning-noSQL?title=mongoose&body=learning mongoose
//     console.log(req.query);
//     console.log(req.params);
//     res.json(data)
// })
// app.post('/todos/create-todo', (req, res) => {
//     // const data = req.body;
//     // console.log(data);
//     const { title, body } = req.body;
//     console.log(title, body);
//     res.send('adding todo')
// })
exports.default = app;
/**
 * Basic File structure
 * server - server handling like - starting, closing error handling of server. only related to server
 * app file - routing handle, middleware, route related error
 * app folder - app business logic handling like create read update delete, database related works
 *
 */
/*
***********************************___***********************************
as it is typescript file so
first open two terminals and then follow two steps
1.tsc -w ---> to convert js automatically
2.nodemon server.js

*/ 
