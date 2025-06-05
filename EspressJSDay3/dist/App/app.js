"use strict";
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
app.get('/', (req, res) => {
    // console.log({ req, res });
    // console.log("tsc -w,nodemon");
    res.send('Welcome to todos App!!!');
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
