console.log(typeof 1);
console.log(typeof "str");
console.log(typeof true);
console.log(typeof undefined); // undefined
console.log(typeof Symbol()); // symbol

console.log(typeof null); //object (자바스크립트의 버그)

// null vs. undefined
console.log("null == undefined", null == undefined); //true
console.log("null === undefined", null === undefined); //false
