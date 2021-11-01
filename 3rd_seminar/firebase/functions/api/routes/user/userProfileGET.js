const util = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const users = require('../../../dbMockup/user');

module.exports = async (req, res) => {
  const id = req.params.id;
  const user = users.filter((user) => user.id === Number(id))[0];

  if (!user) {
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
  }

  res.status(statusCode.OK).send(
    util.success(statusCode.OK, responseMessage.READ_PROFILE_SUCCESS, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }),
  );
};
