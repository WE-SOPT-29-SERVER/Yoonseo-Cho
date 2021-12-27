const functions = require('firebase-functions');
const { success, fail } = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { postDB } = require('../../../db');

module.exports = async (req, res) => {
  const { postId } = req.params;

  if (!postId) return res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  let client;

  try {
    client = await db.connect(req);
    const deletedPost = await postDB.deletePost(client, postId);
    res.status(statusCode.OK).send(success(statusCode.OK, responseMessage.DELETE_ONE_POST_SUCCESS, deletedPost));
  } catch (error) {
    functions.logger.error(`[ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] ${error}`);
    console.log(error);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
