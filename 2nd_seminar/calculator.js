const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  return a / b;
};

module.exports = { add, subtract, multiply, divide };

/*
[module 여러개 export 하기]

const calculator = {
  add,
  subtract,
  multiply,
  divide
}

module.exports = calculator;

----------------------------

[여기서 중요한 JS의 포인트]

const calculator = {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide
}
원래는 key와 value가 함께 있어야함
-> key와 value가 똑같으면 key만 써도된다!!

*/
