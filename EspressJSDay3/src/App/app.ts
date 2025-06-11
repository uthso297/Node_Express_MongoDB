// const express = require('express')
import express, { Application, NextFunction, Request, Response } from 'express'
const app: Application = express()
// const port = 5000
// import fs from 'fs';
import path from 'path';
import { todoRouter } from './Todos/todos.router';

app.use(express.json())
app.use('/todos', todoRouter)
// const filepath = path.join(__dirname, "../../db/todo.json")
// console.log(filepath);

// app.get('/', (req: Request, res: Response) => {
//     // console.log({ req, res });
//     // console.log("tsc -w,nodemon");
//     res.send('Welcome to todos App!!!')
// })

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log({
        url: req.url,
        method: req.method,
        header: req.header
    });
    next()
},

    async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.send('Welcome to Todos App')
        } catch (error) {
            next(error)
        }

    })

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Route not found" })
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (error) {
        console.log("error", error);
        res.status(400).json({ message: "Something went wrong from global error handler", error })
    }
})

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

export default app;


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