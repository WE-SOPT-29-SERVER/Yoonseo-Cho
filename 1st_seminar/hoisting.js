//호이스팅

hoistFunction(); //선언되기 전에 함수를 호출했지만, 에러 발생 x

function hoistFunction() {
  console.log(x);
  var x = "var";
  console.log(x);
}

// 자바스크립트 엔진은 선언부를 최상단으로 끌어올려서 해석한다. ("호이스팅")
// var 변수 뿐만 아니라 함수 선언식도 호이스팅의 대상이 됨
// 위의 코드를 JS 엔진이 해석한 방식:

function hoistFunction() {
  var x;
  console.log(x);
  x = "var";
  console.log(x);
}

hoistFunction();
