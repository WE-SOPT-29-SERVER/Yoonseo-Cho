const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const posts = require('../../../dbMockup/post');

module.exports = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
  };

  posts.push(newPost);

  res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.POST_CREATE_SUCCESS, newPost));
};
