const team = {
  members: [
    { name: "고성용", address: "불광", age: "25" },
    { name: "김은지", address: "마두", age: "24" },
    { name: "박현지", address: "백석", age: "23" },
    { name: "조윤서", address: "이대", age: "23" }
  ],
  printIntroduce: function () {
    this.members.forEach((member) => {
      console.log(
        `안녕하세요 제 이름은 ${member.name}이고, 현재 ${member.address}에 거주중이고 나이는 ${member.age}살 입니다! `
      );
    });
  }
};

console.log("조원들을 소개하겠습니다.");
team.printIntroduce();

/*
[출력결과]

조원들을 소개하겠습니다.
안녕하세요 제 이름은 고성용이고, 현재 불광에 거주중이고 나이는 25살 입니다! 
안녕하세요 제 이름은 김은지이고, 현재 마두에 거주중이고 나이는 24살 입니다!        
안녕하세요 제 이름은 박현지이고, 현재 백석에 거주중이고 나이는 23살 입니다!        
안녕하세요 제 이름은 조윤서이고, 현재 이대에 거주중이고 나이는 23살 입니다!        
*/
