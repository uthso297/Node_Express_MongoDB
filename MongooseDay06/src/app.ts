import express, { Application, Request, Response } from 'express';
import { model, Schema } from 'mongoose';
import { Note } from './app/models/notes.model';
import { notesRoute } from './app/controllers/notes.controller';
import { usersRoutes } from './app/controllers/user.controller';
const app: Application = express();

app.use(express.json())
app.use("/notes", notesRoute)
app.use("/users", usersRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('noteapp server with mongoose😍');
});


export default app;

// mvc -> model,view,controller