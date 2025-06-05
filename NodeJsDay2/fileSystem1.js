/*
File read 
1.Synchronus: file read / I/O intensive task => single thread 
2.Asynchronus: file read / I/O intensive task => single thread => event loop => thread pool => task completion
*/
const fs = require('fs')
console.log('task 1 synchronus');

const data = fs.readFileSync('./hello.txt', { encoding: "utf-8" })
console.log('task 2 synchronus');
fs.writeFileSync('./world.txt', data)
console.log('task 3 synchronus');
console.log(data);
console.log('task 4 synchronus');