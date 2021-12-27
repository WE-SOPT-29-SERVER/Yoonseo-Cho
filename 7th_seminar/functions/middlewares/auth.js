const functions = require('firebase-functions');
const jwtHandlers = require('../lib/jwtHandlers');
const db = require('../db/db');
const { success, fail } = require('../lib/util');
const statusCode = require('../constants/statusCode');
const responseMessage = require('../constants/responseMessage');
const { userDB } = require('../db');
const { TOKEN_INVALID, TOKEN_EXPIRED } = require('../constants/jwt');

const checkUser = async (req, res, next) => {
  // request headers에 accesstoken라는 이름으로 담긴 값(jwt)을 가져오기
  const { accesstoken } = req.headers;

  // accesstoken이 없을 시의 에러 처리
  if (!accesstoken) return res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, responseMessage.TOKEN_EMPTY));

  let client;
  try {
    client = await db.connect(req);

    // jwt를 해독하고 인증 절차를 거치기
    const decodedToken = jwtHandlers.verify(accesstoken);

    // jwt가 만료되었거나 잘못되었을 시의 에러 처리
    if (decodedToken === TOKEN_EXPIRED) return res.status(statusCode.UNAUTHORIZED).send(fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_EXPIRED));
    if (decodedToken === TOKEN_INVALID) return res.status(statusCode.UNAUTHORIZED).send(fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_INVALID));

    // 해독된 jwt에 담긴 id 값이 우리가 DB에서 찾고자 하는 user의 id이다
    const userId = decodedToken.id;

    // 유저id가 없을 시의 에러 처리
    if (!userId) return res.status(statusCode.UNAUTHORIZED).send(fail(statusCode.UNAUTHORIZED, responseMessage.TOKEN_INVALID));

    // 위의 id 값으로 유저를 조회
    const user = await userDB.getUserById(client, userId);

    // 유저가 없을 시의 에러 처리
    if (!user) return res.status(statusCode.UNAUTHORIZED).send(fail(statusCode.UNAUTHORIZED, responseMessage.NO_USER));

    // 유저를 찾았으면, req.user에 유저 객체를 담아서 next()를 이용해 다음 middleware로 보낸다.
    // 다음 middleware는 req.user에 담긴 유저 정보를 활용할 수 있디
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    functions.logger.error(`[AUTH ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, accesstoken);
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};

module.exports = { checkUser };
