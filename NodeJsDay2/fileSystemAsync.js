const fs = require('fs')

console.log('Task 1');

let text;
fs.readFile('./world.txt', { encoding: 'utf8' }, (err, data) => {
    if (err) {
        console.log(`Error reading file ${err}`);
        return;
    }
    // console.log(`File content: ${data}`);
    text = data;
    console.log(`${data} inside callback`);
})

console.log(text);

console.log('Task 2');