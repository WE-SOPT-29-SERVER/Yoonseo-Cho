const util = require("../../lib/util");
const users = require("../../dbMockup/user");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }
  const user = users.filter((user) => user.email === email)[0];

  if (!user) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }

  if (user.password !== password) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
  }

  res.status(statusCode.OK).send(
    util.success(statusCode.OK, responseMessage.LOGIN_SUCCESS, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    })
  );
};

// 성공적인 경우 response를 보낼때는 return문 안쓰는 편(에러 처리 시에는 꼭 써줄 것)
