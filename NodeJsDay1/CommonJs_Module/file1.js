// const var1 = require('./file2') // can use this if you do not have to use alias
const { a, add, b } = require('./file2')
const { a: a3, add: add3, b: b3 } = require('./file3')
// console.log(var1)
// console.log(var1.a)
// console.log(var1.add(3, 4))
console.log(a);
console.log(add(3, 4));
console.log(a3);
