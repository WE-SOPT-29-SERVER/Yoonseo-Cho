const num = 2;
const str = "2";

/* 동등 연산자 : 값만 비교
  == (equal) , != (not equal)
*/
console.log(num == str); //true

// 여기서 값이란? 비교 대상의 값들에 따라 다름
// 숫자와 문자열을 비교할 때 : 숫자 -> 문자열로 바꿈
console.log(num + str); // 22
console.log(typeof (num + str)); //string (타입 캐스팅)
console.log(Number(num) + Number(str)); //4

/*-------------------------*/

/* 일치 연산자 : 값과 타입 모두 비교
  === (equal) , !== (not equal) 
*/
console.log(num === str); //false
