// console.log(process.argv);
const path = require('path')
const fs = require('fs')
const inputArguments = process.argv.slice(2)
console.log(inputArguments);
const text = inputArguments.join(' ');
const timeStamp = new Date().toISOString();
const message = `${text} ${timeStamp} \n`
// console.log(message);

if (!message) {
    console.log('Please provide a message to log');
    console.log('Example: node index.js Hello World');
    process.exit(1)
}
// console.log(path);
const filePath = path.join(__dirname, 'log.txt')
console.log(filePath);

fs.appendFile(filePath, message, { encoding: 'utf8' }, () => {
    console.log('Your log added successfully');;
})