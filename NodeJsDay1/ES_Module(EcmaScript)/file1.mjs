// const var1 = require('./file2') // can use this if you do not have to use alias
// const { a, add, b } = require('./file2')
// const { a: a3, add: add3, b: b3 } = require('./file3')
import { a, b as B, add } from "./file2.mjs"
import ADD, { a as A3, b } from "./file3.mjs"
// console.log(var1)
// console.log(var1.a)
// console.log(var1.add(3, 4))
console.log(a);
console.log(add(3, 4));
console.log(B);
console.log(A3);
console.log(ADD(2,3,4));