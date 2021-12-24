const functions = require('firebase-functions');
const { success, fail } = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { userDB } = require('../../../db');

module.exports = async (req, res) => {
  const { userId } = req.params;
  const { username, phone } = req.body;

  if (!userId) return res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  let client;

  try {
    client = await db.connect(req);
    const updatedUser = await userDB.updateUser(client, userId, username, phone);
    if (!updatedUser) return res.status(statusCode.NOT_FOUND).send(fail(statusCode.NOT_FOUND, responseMessage.NO_USER));
    res.status(statusCode.OK).send(success(statusCode.OK, responseMessage.UPDATE_ONE_USER_SUCCESS, updatedUser));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
