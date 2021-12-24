const functions = require('firebase-functions');
const { success, fail } = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { userDB } = require('../../../db');

module.exports = async (req, res) => {
  let client;
  try {
    // db/db.js에 정의한 connect 함수를 통해 connection pool에서 connection을 빌려온다
    client = await db.connect(req); // 이제부터 release하기전까지 쿼리문을 실행할 수 있게됨
    const users = await userDB.getAllUsers(client);
    res.status(statusCode.OK).send(success(statusCode.OK, responseMessage.READ_ALL_USERS_SUCCESS, users));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    // db.connect(req)를 통해 빌려온 connection을 connection pool에 되돌려줌
    client.release();
  }
};
