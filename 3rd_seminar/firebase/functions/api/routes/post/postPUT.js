const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const posts = require('../../../dbMockup/post');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { newTitle, newContent } = req.body;
  if (!newTitle || !newContent) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  const existingPost = posts.filter((post) => post.id === Number(id))[0];

  if (!existingPost) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POST));
  }

  const updatePost = { ...existingPost, title: newTitle, content: newContent };

  res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.POST_UPDATE_SUCCESS, updatePost));
};
