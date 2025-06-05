const http = require('http')
const path = require('path')
const fs = require('fs')
const filePath = path.join(__dirname, "./db/todo.json")

// const data = [
//     {
//         "title": "prisma",
//         "body": "Learning prisma",
//         "createdAt": "5/18/2025, 1:25:02 AM"
//     },
//     {
//         "title": "typescript",
//         "body": "learning node",
//         "createdAt": "5/18/2025, 1:25:12 AM"
//     },
//     {
//         "title": "express",
//         "body": "Learning advanced express",
//         "createdAt": "5/29/2025, 5:55:16 AM"
//     },
//     {
//         "title": "mongodb",
//         "body": "learning mongodb",
//         "createdAt": "5/29/2025, 5:55:46 AM"
//     }
// ]

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const pathanme = url.pathname
    // console.log(`url is ${url}`);
    // console.log(url);
    // console.log(req.url,req.method);
    // console.log(req);
    if (req.url === '/todos' && req.method === 'GET') {
        const data = fs.readFileSync(filePath, { encoding: 'utf8' })
        // header method-1
        // res.writeHead(200, {
        //     "content-type": "text/html"
        // })
        // res.writeHead(200,{
        //     "content-type" : "text/plain"
        // })

        // res.writeHead(201, {
        //     "content-type": "application/json",
        //     "email": "uthso@uthso.com"

        // })
        res.writeHead(200, {
            "content-type": "application/json",
            "email": "uthso@uthso.com"

        })
        //header method-2
        // res.statusCode = 201;
        // res.setHeader("content-type","text/plain")
        // res.setHeader("email","uthso@uthso.com")
        // get json data in server
        // res.end(JSON.stringify(data))
        res.end(data)
        // get html in server
        // res.end(`<h1>Hello World!!</h1>`)
        //         res.end(`
        //             <!DOCTYPE html>
        // <html>
        // <head>
        //     <title>Basic HTML with Inline CSS</title>
        // </head>
        // <body style="background-color: #f0f0f0; font-family: Arial, sans-serif;">

        //     <h1 style="color: #2c3e50; text-align: center;">Welcome to My Webpage</h1>

        //     <p style="color: #555; font-size: 16px; text-align: center;">
        //         This is a paragraph styled with inline CSS.
        //     </p>

        //     <a href="https://example.com" style="display: block; text-align: center; color: #3498db; text-decoration: none;">
        //         Visit Example.com
        //     </a>

        //     <div style="width: 300px; margin: 20px auto; padding: 10px; background-color: white; border: 1px solid #ccc;">
        //         <p style="margin: 0; color: #333;">
        //             This is a styled box using inline CSS.
        //         </p>
        //     </div>

        // </body>
        // </html>

        //             `)
    }
    else if (req.url === '/todos/create-todo' && req.method === 'POST') {
        // console.log('hit');
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
        })
        req.on("end", () => {
            console.log(data);
            // const todo = JSON.parse(data)
            const { title, body } = JSON.parse(data)
            // console.log(todo);
            console.log(title, body);
            const createdAt = new Date().toLocaleString()
            const allTodos = fs.readFileSync(filePath, { encoding: "utf8" })
            // console.log(allTodos);
            const parsedAllTodos = JSON.parse(allTodos)
            // console.log(parsedAllTodos);
            parsedAllTodos.push({ title, body, createdAt })
            // console.log(JSON.stringify(parsedAllTodos));
            // fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos), { encoding: "utf8" })
            fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), { encoding: "utf8" })
            res.end(JSON.stringify({ title, body, createdAt }, null, 2))
        })
    }
    // else if (req.url.startsWith('/todo') && req.method === 'GET') {
    //     res.end("Single todo")
    // }
    else if (pathanme === '/todo' && req.method === 'GET') {
        const title = url.searchParams.get("title")
        console.log(title);
        const data = fs.readFileSync(filePath, { encoding: 'utf8' })
        const parsedData = JSON.parse(data)
        const todo = parsedData.find(todo => todo.title === title)
        const stringifiedTodo = JSON.stringify(todo)
        res.writeHead(200, {
            "content-type": "application/json",

        })
        res.end(stringifiedTodo)
    }
    else if (pathanme === '/todo/update-todo' && req.method === "PATCH") {
        const title = url.searchParams.get("title");
        let data = "";

        req.on("data", (chunk) => {
            data = data + chunk;
        });

        req.on("end", () => {
            const { body } = JSON.parse(data);

            const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
            const parsedAllTodos = JSON.parse(allTodos);

            const todoIndex = parsedAllTodos.findIndex(
                (todo) => todo.title === title
            );

            parsedAllTodos[todoIndex].body = body;

            fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {
                encoding: "utf-8",
            });

            res.end(
                JSON.stringify(
                    { title, body, createdAt: parsedAllTodos[todoIndex].createdAt },
                    null,
                    2
                )
            );
        });

    }
    else if (pathanme === '/todo/delete-todo' && req.method === 'DELETE') {
        const title = url.searchParams.get("title")
        // console.log(title);

        const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
        const parsedAllTodos = JSON.parse(allTodos);

        // console.log(parsedAllTodos);
        const todos = parsedAllTodos.filter(todo => {
            if (todo.title !== title) {
                return todo
            }
        })

        console.log(todos);
        fs.writeFileSync(filePath, JSON.stringify(todos, null, 2), {
            encoding: "utf-8",
        });

        res.end(title)
    }
    else if (req.url === '/' && req.method === 'GET') {
        res.end('Welcome to todo app server')
    }
    else {
        res.end('Route Not Found')
    }
})

server.listen(5000, '127.0.0.1', () => {
    console.log('✅ Serever listening to port 5000');
})

/*
*.URL - Method
1. /todos - GET => get all todos
2. /todos/create-todo - POST => create a todo
3.

*/