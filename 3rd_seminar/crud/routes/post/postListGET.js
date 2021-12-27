const util = require("../../lib/util");
const posts = require("../../dbMockup/post");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

module.exports = async (req, res) => {
  res
    .status(statusCode.OK)
    .send(
      util.success(statusCode.OK, responseMessage.READ_POST_LIST_SUCCESS, posts)
    );
};
