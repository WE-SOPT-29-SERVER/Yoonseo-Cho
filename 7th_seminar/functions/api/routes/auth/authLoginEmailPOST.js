const functions = require('firebase-functions');
const { signInWithEmailAndPassword } = require('firebase/auth');
const { success, fail } = require('../../../lib/util');
const statusCode = require('../../../constants/statusCode');
const responseMessage = require('../../../constants/responseMessage');
const db = require('../../../db/db');
const { userDB } = require('../../../db');
const { firebaseAuth } = require('../../../config/firebaseClient');

const jwtHandlers = require('../../../lib/jwtHandlers');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(statusCode.BAD_REQUEST).send(fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
  }

  let client;

  try {
    client = await db.connect(req);

    // Firebase Authentication을 통해 유저 인증
    const userFirebase = await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((user) => user)
      .catch((e) => {
        console.log(e);
        return { err: true, error: e };
      });

    if (userFirebase.err) {
      if (userFirebase.error.code === 'auth/user-not-found') {
        return res.status(statusCode.NOT_FOUND).json(fail(statusCode.NOT_FOUND, responseMessage.NO_USER));
      } else if (userFirebase.error.code === 'auth/invalid-email') {
        return res.status(statusCode.NOT_FOUND).json(fail(statusCode.NOT_FOUND, responseMessage.INVALID_EMAIL));
      } else if (userFirebase.error.code === 'auth/wrong-password') {
        return res.status(statusCode.NOT_FOUND).json(fail(statusCode.NOT_FOUND, responseMessage.MISS_MATCH_PW));
      } else {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json(fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
      }
    }

    // const idFirebase = userFirebase.user.uid;
    const {
      user: { uid: idFirebase },
    } = userFirebase;

    // RDS DB에 저장된 user 조회
    const user = await userDB.getUserByIdFirebase(client, idFirebase);

    // JWT 발급
    const { accesstoken } = jwtHandlers.sign(user);

    // user와 JWT를 response로 전송
    res.status(statusCode.OK).send(success(statusCode.OK, responseMessage.LOGIN_SUCCESS, { user, accesstoken }));
  } catch (error) {
    console.log(error);
    functions.logger.error(`[EMAIL LOGIN ERROR] [${req.method.toUpperCase()}] ${req.originalUrl}`, `[CONTENT] email:${email} ${error}`);

    res.status(statusCode.INTERNAL_SERVER_ERROR).send(fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.INTERNAL_SERVER_ERROR));
  } finally {
    client.release();
  }
};
