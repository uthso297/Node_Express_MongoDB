import { MongoClient, ServerApiVersion } from "mongodb";


const uri = "mongodb+srv://uthsoDB:UthsoMef3647@cluster0.g3mp55c.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
