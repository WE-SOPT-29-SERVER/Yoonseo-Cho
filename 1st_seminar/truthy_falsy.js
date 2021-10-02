const num1 = 1;
const num2 = 2;

const str = "2";

const bool = true;

console.log(num1 == bool); // true (1 -> true)
console.log(num1 === bool); //false (2 -> false)
//true == 1 , false == 0

//Truthy (대충 true다)
console.log(Boolean(10)); // true
console.log(Boolean(-40)); // true
console.log(Boolean("문자")); // true
console.log(Boolean(true)); // true
console.log(Boolean({})); // true (빈 객체)
console.log(Boolean([])); // true (빈 배열)

//Falsy (대충 false다)
false, 0, null, undefined, "";
console.log(Boolean(0)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(null)); // false
console.log(Boolean("")); // false (빈 문자열)
console.log(Boolean(false)); // false
