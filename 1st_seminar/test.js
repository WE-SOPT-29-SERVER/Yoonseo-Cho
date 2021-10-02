// 변수 선언법

// var : 재선언, 재할당 가능
var variableVar = "123";
var variableVar = "321";

console.log("variableVar", variableVar); //321

// let : 재선언 불가능, 재할당 가능
let variableLet = "123";
let variableLet = "321";

console.log("variableLet", variableLet); //에러!

// const : 재선언 불가능, 재할당 불가능
const variableConst = "123";
const variableConst = "321";
console.log("variableConst", variableConst); //에러!

var someVar;
let someLet;
const someConst; //에러! 초기값 필요

/*-------------------*/

//function scope : var (유효범위가 함수 내)
if (true) {
  var x = "var";
}
console.log(x); // var

function colorFunction() {
  if (true) {
    var color = "blue";
    console.log(color);
  }
  console.log(color);
}
console.log(color); //에러!

/*-------------------*/

//block scope : let, const (유효범위가 중괄호 사이 블록/ 블록 밖에서 접근 불가능)
if (true) {
  let y = "let";
}
console.log(y); //블록 밖에서 접근 불가능
