import app from "./app";
import { client } from "./config/mongodb";

let server;
const port = 5000


const bootStrap = async () => {
    await client.connect();
    console.log('connected to mongodb');
    const db = await client.db("todosDB")
    const collection = await db.collection('todos')
    server = app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

bootStrap();