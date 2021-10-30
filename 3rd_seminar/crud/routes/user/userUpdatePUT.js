const util = require("../../lib/util");
const users = require("../../dbMockup/user");
const responseMessage = require("../../constants/responseMessage");
const statusCode = require("../../constants/statusCode");

module.exports = async (req, res) => {
  const { id } = req.params;
  const { newName } = req.body;
  if (!id || !newName) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  const existingUser = users.filter((user) => user.id === Number(id))[0];

  console.log(existingUser);
  if (!existingUser) {
    return res
      .status(statusCode.BAD_REQUEST)
      .send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }

  const updateUser = { ...existingUser, name: newName };

  res
    .status(statusCode.OK)
    .send(
      util.success(
        statusCode.OK,
        responseMessage.USER_UPDATE_SUCCESS,
        updateUser
      )
    );
};
