/*1. 함수 선언식 */
function add(x, y) {
  return x + y;
}
console.log(add(2, 3));

/*2. 함수 표현식*/
const addStr = function (x, y) {
  return x + y;
};
console.log(addStr("안녕", "하세요"));

/*3. 함수 표현식 - 화살표 함수 */

const add = (x, y) => {
  return x + y;
};

const add = (x) => {
  return x;
}; // 참고: 매개변수가 하나일때는 매개변수 소괄호 생략 가능

const add = () => {
  return 1;
};

//로직이 한 줄일때는 return 생략 가능
const add = (x, y) => x + y;

// 객체를 리턴하고, 로직이 한줄일때는 소괄호 () 로 감싸줘야함
const person = (name, age) => ({ name: name, age: age });

// 위의 person 화살표 함수와 동일한 표현
const person = function (name, age) {
  return {
    name: name,
    age: age
  };
};

/*-------------------*/

const arr = [1, 2, 3];
arr.filter(function (object) {
  return object === 1; //조건을 만족하는 것만 추출
});

arr.filter((o) => o === 1); // 여기서는, 한줄 표현식이 가독성이 더 좋음
