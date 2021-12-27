const util = require("../../lib/util");
const posts = require("../../dbMockup/post");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

module.exports = async (req, res) => {
  const { id } = req.params;
  const post = posts.filter((post) => post.id === Number(id))[0];

  console.log(post);
  if (!post) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_POST));
  }

  res.status(statusCode.OK).send(
    util.success(statusCode.OK, responseMessage.READ_POST_DETAIL_SUCCESS, {
      post: {
        id: post.id,
        title: post.title,
        content: post.content
      }
    })
  );
};
