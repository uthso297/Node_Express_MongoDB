const fs = require('fs')
const text = 'Hello async file write'
console.log(1);
console.log(2);
console.log(text);
fs.writeFile("./hi.txt", text, { encoding: "utf-8" }, (err) => {
    if (err) {
        console.log("Something went wrong", err);
        return;
    }
    console.log("Written succesfuly");
});
console.log(3);
console.log(4);