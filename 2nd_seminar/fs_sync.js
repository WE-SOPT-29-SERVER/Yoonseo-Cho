const fs = require("fs");

const numArr = [1, 2, 3, 4, 5];

/*
  fs.writeFileSync (filename, data, [options]) {}
  : filename의 파일에 [options]의 방식으로 data 내용을 쓴다. (동기적)
   동기 방식으로 파일 쓰기 - 순서 확인해보기!!
*/

numArr.forEach((num) => {
  const title = "sync" + num;
  const data = `파일이 잘 만들어졌어요!\n 제 이름은 '${title}.txt'입니다~`;
  fs.writeFileSync(`${title}.txt`, data);
  console.log(`${title} 동기 방식이니, 순서에 맞게!!`);
});

/*
  fs.readFileSync (filename, [options]) {}
  : filename의 파일을 [options]의 방식으로 읽은 후 내용을 반환한다. (동기적)
   동기 방식으로 파일 읽기 - 순서 확인해보기!!
*/

numArr.forEach((num) => {
  const title = "sync" + num;
  const data = fs.readFileSync(`${title}.txt`);
  console.log(`${title}.txt 파일에는 아래의 데이터가 있습니다. \n"${data}"\n`);
});
