const members = require("./members");

const getOnline = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = members.filter((o) => o.location === "online");
      resolve(data);
    }, 500);
  });
};

const getOffline = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = members.filter((o) => o.location === "offline");
      resolve(data);
    }, 500);
  });
};

const getYB = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = members.filter((o) => o.group === "YB");
      resolve(data);
    }, 500);
  });
};

const getOB = (members) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = members.filter((o) => o.group === "OB");
      resolve(data);
    }, 500);
  });
};

// getOnline(members).then(getOB).then(console.log);
// getYB(members).then(getOffline).then(console.log);

// async와 await으로 바꾸기
const asyncFunc = async (members) => {
  const onlineMembers = await getOnline(members); // Promise에서 매개변수로 넘겼던 것을 이렇게 const로 빼내준 것
  const onlineObMembers = await getOB(onlineMembers);
  console.log(onlineObMembers);
};

asyncFunc(members);

/*
console.log(getOnline(members));
getOnline(members).then((mem) => console.log(mem));

getOnline(members)
  .then(result => getOB((result))
*/
