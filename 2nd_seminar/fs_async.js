const fs = require("fs");

const numArr = [1, 2, 3, 4, 5];

/*
  fs.writeFile (filename, data, [options], callback) {}
  : filename의 파일에 [options]의 방식으로 data 내용을 쓴 후 callback 함수를 호출한다. (비동기적)
  비동기 방식으로 파일 쓰기 - 순서 확인해보기!!
*/

numArr.forEach((num) => {
  const title = "async" + num;
  const data = `파일이 잘 만들어졌어요!\n 제 이름은 '${title}.txt'입니다~`;
  fs.writeFile(`${title}.txt`, data, (err, data) => {
    if (err) return console.log(err.message);
    console.log(`${title} 비동기 방식이라 순서가 뒤죽박죽!!`);
  });
});

/*
  fs.readFile (filename, [options], callback) {}
  : filename의 파일을 [options]의 방식으로 읽은 후 callback으로 전달된 함수를 호출합니다. (비동기적)
  비동기 방식으로 파일 읽기 - 순서 확인해보기!!
*/

numArr.forEach((num) => {
  const title = "async" + num;
  fs.readFile(`${title}.txt`, (err, data) => {
    if (err) return console.log(err.message);
    console.log(
      `${title}.txt 파일에는 아래의 데이터가 있습니다. \n"${data}"\n`
    );
  });
});

/*
[readFileSync 및 writeFileSync 에 대하여]

Sync가 붙은 것은 동기적 읽기, 붙지 않은 것은 비동기적 읽기이다. 
파일을 읽는데 시간이 오래 걸릴 수도 있다. 이때 동기적 읽기로 읽게 되면 파일을 읽으면서 다른 작업을 동시에 할 수 없게 된다. 
따라서, "비동기적으로" 읽으면 파일을 읽으면서 다른 작업도 동시에 수행할 수 있고 파일을 다 읽으면 매개변수 callback으로 전달한 함수가 호출된다.
*/
