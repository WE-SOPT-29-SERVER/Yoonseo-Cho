/*Object 생성자 함수*/
const person = new Object(); // 빈 객체 생성

person.name = "조윤서";
person.part = "Server";
person["group"] = "OB";
person.sayHello = function () {
  console.log(`안녕하세요 ${this.name}입니다`);
};

console.log(typeof person);
console.log(person);

person.sayHello();

console.log("==========");

/*객체 리터럴(가장 일반적인 자바스크립트의 객체 생성 방식) */
const emptyObject = {}; //빈 객체 생성
console.log(typeof emptyObject); //object

const animal = {
  animalType: "dog",
  animalName: "뽀삐",
  animalFriends: ["코코", "초코", "쿠키"],
  bark: function () {
    console.log(`${this.animalName}: 멍멍`);
  },
  thisFriends: function () {
    this.animalFriends.forEach((friend) => {
      console.log(`${this.animalName}의 친구 : ${friend}`);
    });
  }
};

console.log(animal);
animal.bark();
animal.thisFriends();

/*
객체 안에서 메소드를 작성하여, 같은 객체 안의 다른 프로퍼티에 접근하고자 할때 this 사용에 주의
-> 화살표 함수 사용 x

[this가 없는 화살표 함수]
화살표 함수는 일반 함수와는 달리 ‘고유한’ this를 가지지 않는다. 
화살표 함수에서 this를 참조하면, 화살표 함수가 아닌 평범한 외부 함수에서 this 값을 가져온다.
 */
