import express, { Request, Response } from "express";
import { client } from "../config/mongodb";
import { ObjectId } from "mongodb";
export const todoRouter = express.Router()

// const filepath = path.join(__dirname, "../../../db/todo.json")

todoRouter.get('/', async (req: Request, res: Response) => {
    // console.log({ req, res });
    // console.log("tsc -w,nodemon");
    // const data = fs.readFileSync(filepath, { encoding: 'utf8' })
    // res.json(data)
    const db = await client.db("todosDB")
    const collection = await db.collection("todos")
    const cursor = await collection.find()
    const todos = await cursor.toArray()
    // res.send(todos)
    res.json(todos)
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
todoRouter.get('/:id', async (req, res) => {
    // params id is string
    console.log(req.params.id);
    const id = req.params.id
    const query = { _id: new ObjectId(id) }
    console.log(query);
    const db = await client.db("todosDB")
    const collection = await db.collection("todos")
    const cursor = await collection.find(query)
    const todo = await cursor.toArray()
    console.log(todo);
    res.send(todo)
})
todoRouter.put("/update-todo/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    const db = await client.db("todosDB")
    const collection = await db.collection("todos")

    const { title, description, priority, isCompleted } = req.body;
    const filter = { _id: new ObjectId(id) }

    const updatedTodo = await collection.updateOne(
        filter,
        { $set: { title, description, priority, isCompleted } },
        { upsert: true }
    )
    res.json(updatedTodo)
})
todoRouter.delete('/delete-todo/:id', async (req, res) => {
    const id = req.params.id
    // const query = { _id: new ObjectId(id) }
    // console.log(query);
    const db = await client.db("todosDB")
    const collection = await db.collection("todos")
    // const result = await collection.deleteOne(query)
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    res.send(result)
})