const functions = require('firebase-functions');
const { success, fail } = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { postDB } = require('../../../db');

module.exports = async (req, res) => {
  const { userId, title, content } = req.body;

  const imageUrls = req.imageUrls;

  if (!userId) return res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  let client;

  try {
    client = await db.connect(req);
    const post = await postDB.addPost(client, userId, title, content, imageUrls);
    res.status(statusCode.OK).send(success(statusCode.OK, responseMessage.ADD_ONE_POST_SUCCESS, post));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
