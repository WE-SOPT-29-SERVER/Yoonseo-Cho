const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const posts = require('../../../dbMockup/post');

module.exports = async (req, res) => {
  res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.READ_POST_LIST_SUCCESS, posts));
};
