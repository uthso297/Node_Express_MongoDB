import express, { Request, Response } from "express";
import fs from "fs"
import path from "path";
import { client } from "../config/mongodb";
export const todoRouter = express.Router()

// const filepath = path.join(__dirname, "../../../db/todo.json")

todoRouter.get('/', (req: Request, res: Response) => {
    // console.log({ req, res });
    // console.log("tsc -w,nodemon");
    // const data = fs.readFileSync(filepath, { encoding: 'utf8' })
    // res.json(data)
})

todoRouter.post('/create-todo', async (req, res) => {
    const { title, description, priority } = req.body;
    // console.log(title, body);
    const db = await client.db("todosDB")
    const collection = await db.collection("todos")
    // const todos = await collection.insertOne({
    //     title: "MongoDB",
    //     description: "Learning Mongodb",
    //     priority: "High",
    //     isCompleted: false
    // })
    await collection.insertOne({
        title: title,
        description: description,
        priority: priority,
        isCompleted: false
    })
    const cursor = await collection.find()
    const todos = await cursor.toArray()
    console.log(todos);
    res.json(todos)
})
todoRouter.get('/:title', (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    res.send('adding todo')
})
todoRouter.put('/update-todo/:title', (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    res.send('adding todo')
})
todoRouter.delete('/delete-todo/:title', (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    res.send('adding todo')
})