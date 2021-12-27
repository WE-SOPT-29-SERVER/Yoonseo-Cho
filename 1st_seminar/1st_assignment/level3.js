const members = require("./members");
const maxMember = 4; // 한 조의 최대 인원 수
const teamNum = Math.ceil(members.length / maxMember); // 조의 개수
let teamArr = Array.from({ length: teamNum }, () => []); // 조의 개수만큼 빈 배열 생성
let ob_list = [];
let yb_list = [];

// OB, YB에 따라 분류된 배열을 리턴해주는 함수
const classify = () => {
  ob_list = members.filter((member) => member.group === "OB");
  yb_list = members.filter((member) => member.group === "YB");
};

// OB, YB 내에서 각각 무작위로 섞어주는 함수
const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

// 최종 결과 배열인 teamArr에 OB, YB를 배치해주는 함수
const arrange = () => {
  for (let i = 0; i < ob_list.length; i++) {
    teamArr[i % teamNum].push(ob_list[i]);
  }
  for (i = 0; i < yb_list.length; i++) {
    // 최대 인원수를 넘는 경우
    if (teamArr[i % teamNum].length < maxMember) {
      teamArr[i % teamNum].push(yb_list[i]);
    } else {
      teamArr.find((team) => team.length < maxMember).push(yb_list[i]);
    }
  }
};

// 최종 결과를 출력해주는 함수
const printResult = () => {
  console.log(`최대인원 ${maxMember}명을 넘지않게 구성한 조입니다.`);
  for (let i = 0; i < teamArr.length; i++) {
    console.log(`${i + 1}조`);
    for (let member of teamArr[i]) {
      console.log(`이름: ${member.name} (${member.group})`);
    }
    console.log();
  }
};

const mainFunc = () => {
  classify(); // OB와 YB를 따로 분리하기

  shuffle(ob_list); // OB와 YB 내에서 각각 무작위로 섞기
  shuffle(yb_list);

  arrange(); // OB와 YB를 각 조에 배치하기

  printResult(); // 최종 조를 출력하기
};

mainFunc();

/*
[출력결과]

최대인원 5명을 넘지않게 구성한 조입니다.
1조
이름: 박나희 (OB)
이름: 이솔 (OB)
이름: 주어진사랑 (YB)
이름: 남지윤 (YB)
이름: 김진욱 (YB)

2조
이름: 정설희 (OB)
이름: 이다은 (OB)
이름: 박정현 (YB)
이름: 허유정 (YB)
이름: 조재호 (YB)

3조
이름: 박현지 (OB)
이름: 서호영 (OB)
이름: 주효식 (YB)
이름: 이정은 (YB)
이름: 최진영 (YB)

4조
이름: 김희빈 (OB)
이름: 조윤서 (OB)
이름: 이동근 (YB)
이름: 설지원 (YB)
이름: 조찬우 (YB)

5조
이름: 채정아 (OB)
이름: 변주현 (OB)
이름: 최유림 (YB)
이름: 권세훈 (YB)
이름: 구건모 (YB)

6조
이름: 최영재 (OB)
이름: 강한희 (OB)
이름: 김은지 (YB)
이름: 이승헌 (YB)

7조
이름: 오예원 (OB)
이름: 안준영 (OB)
이름: 김영권 (YB)
이름: 손시형 (YB)

8조
이름: 장서현 (OB)
이름: 고성용 (OB)
이름: 문규원 (YB)
이름: 이제준 (YB)
*/
