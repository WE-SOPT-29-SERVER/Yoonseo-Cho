/* 1. 배열 */

let arr1 = [];
console.log(arr1);
console.log(typeof arr1);

let arr2 = new Array(1, 2, 3, 4, 5);
console.log(arr2);
console.log(typeof arr2);

let arr3 = ["조윤서", 1, 2, 3, null, { name: "yoonseo", age: 23 }];
console.log(arr3);
console.log(typeof arr3);

/*-------------------------------------*/
/*2. 배열 prototype 메서드*/

console.log("**** Array 기본 함수들을 알아보자 ****");
let arr = [1, 2, 3, 4];

// 2-1, length
console.log(`arr의 길이: ${arr.length}`); //4

// 2-2, push, pop
arr.push("new item"); // 배열의 맨 끝에 값을 추가
console.log("arr push:", arr); //[1, 2, 3, 4, 'new item']
arr.pop(); // 배열의 맨 끝에 값을 제거
console.log("arr pop:", arr); //[1, 2, 3, 4]

// 2-3 shift, unshift
arr.unshift("first item"); // 배열의 맨 앞에 값을 추가하고, 배열의 길이 반환
console.log("arr unshift:", arr); //['first item', 1, 2, 3, 4]
arr.shift(); // 배열의 맨 앞에 값을 제거하고, 제거된 요소 반환
console.log("arr shift:", arr); //[1, 2, 3, 4]

// 2-4 includes : 특정요소 포함여부
console.log("arr.includes(4):", arr.includes(4)); //true
console.log("arr.includes(1000):", arr.includes(1000)); //false

// 2-5 indexOf : 지정된 요소를 찾을 수 있는 첫번째 인덱스를 반환하고, 존재하지 않으면 -1 반환
console.log("arr.indexOf(4):", arr.indexOf(4)); //3
console.log("arr.indexOf(100):", arr.indexOf(100)); //-1

// 2-6 concat: 배열을 합쳐줌
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let concatArr = arr1.concat(arr2);
console.log("arr1.concat(arr2):", concatArr); //[1, 2, 3, 4, 5, 6]

// 2-7 join : 모든 원소를 연결해서 하나의 문자열로 만듦 (구분자 설정 가능)
let location = ["서울", "대전", "대구", "부산"];
console.log(location.join("-> ")); //서울-> 대전-> 대구-> 부산

// 2-8 reverse : 배열의 순서를 반전
console.log(location.reverse().join("-> ")); //부산-> 대구-> 대전-> 서울

// 2-9 sort : 배열의 요소를 정렬한 후 그 배열을 반환, 기본 정렬 순서는 문자열의 유니코드 코드 포인트를 따름
let countries = ["Österreich", "Andorra", "Vietnam"];
console.log(countries.sort((a, b) => (a > b ? 1 : -1))); // ['Andorra', 'Vietnam', 'Österreich'] (제대로 정렬 x)
console.log(
  countries.sort(function (a, b) {
    return a.localeCompare(b);
  })
); // ['Andorra', 'Österreich', 'Vietnam'] (제대로 정렬됨) 유니코드 기준으로 문자 정렬

console.log(
  "오름차순 정렬:",
  concatArr.sort((a, b) => a - b)
); //[1, 2, 3, 4, 5, 6]

console.log(
  "내림차순 정렬:",
  concatArr.sort(function (a, b) {
    return b - a;
  })
); //[6, 5, 4, 3, 2, 1]

// 2-10 filter : 배열 요소 전체를 대상으로 조건을 걸어서, 그 조건을 충족하는 결과를 새로운 배열로 반환
let number = [100, 234, -125, 1, 23, -637, -123, 99, 2, 3, 4, 5];
let minusNumber = number.filter((item) => item < 0);
console.log("minusNumber: ", minusNumber); //[-125, -637, -123]

// 2-11 map : 배열 요소 전체를 대상으로 함수를 호출하고, 그 결과를 새로운 배열로 반환할때 주로 사용
let countries = ["Österreich", "Andorra", "Vietnam", "Korea", "China"];
let countriesLengths = countries.map((item) => item.length);
console.log("countriesLengths: ", countriesLengths); //[10, 7, 7, 5, 5]

// 2-12 reduce : map은 배열을 반환할때 사용했지만 reduce는 값 하나를 반환할때 주로 사용 (대표적인 예시로 1 ~ n 까지 더하기)
let number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = number.reduce((previousValue, currentValue) => {
  console.log(`previousValue: ${previousValue}, currentValue: ${currentValue}`);
  return previousValue + currentValue;
});

/*
previousValue: 1, currentValue: 2
previousValue: 3, currentValue: 3
previousValue: 6, currentValue: 4
previousValue: 10, currentValue: 5
previousValue: 15, currentValue: 6
previousValue: 21, currentValue: 7
previousValue: 28, currentValue: 8
previousValue: 36, currentValue: 9
previousValue: 45, currentValue: 10
*/

console.log("sum = ", sum); // 55

/*-------------------------------------*/
/*3. 배열 순회 */

let serverPart = [
  "강한희",
  "고성용",
  "구건모",
  "권세훈",
  "김영권",
  "김은지",
  "김진욱"
];
let serverIndexStr = '서버파트 여러분 번호 한번 세겠습니다. "';
let serverPartMemberNameStr = '서버파트 여러분 이름 한번씩만 불러주세요~ "';

for (let item in serverPart) {
  console.log(item);
  serverIndexStr += item + "! ";
}
console.log(serverIndexStr); // 서버파트 여러분 번호 한번 세겠습니다. "0! 1! 2! 3! 4! 5! 6!

for (let item of serverPart) {
  serverPartMemberNameStr += item + "! ";
}
console.log(serverPartMemberNameStr); //서버파트 여러분 이름 한번씩만 불러주세요~ "강한희! 고성용! 구건모! 권세훈! 김영권! 김은지! 김진욱!

serverPart.forEach((item) => {
  console.log(item);
});
/*
강한희
고성용
구건모
권세훈
김영권
김은지
김진욱
*/
