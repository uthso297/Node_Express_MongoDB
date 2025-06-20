import { Server } from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

let server: Server;

dotenv.config();

const PORT = 5000;

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g3mp55c.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('Connected to mongodb using mongoose😍');
        server = app.listen(PORT, () => {
            console.log(`note app is listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

main()