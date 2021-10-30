const util = require("../../lib/util");
const users = require("../../dbMockup/user");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

module.exports = async (req, res) => {
  const { email, name, password } = req.body;

  // 예외처리
  if (!email || !name || !password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  // 같은 이메일의 유저가 존재하는지 확인
  const alreadyUser = users.filter((user) => user.email === email).length > 0;
  if (alreadyUser) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_EMAIL));
  }

  const newUser = {
    id: users.length + 1,
    name,
    password,
    email
  };

  users.push(newUser);

  res
    .status(statusCode.OK)
    .send(util.success(statusCode.OK, responseMessage.CREATED_USER, newUser));
};
