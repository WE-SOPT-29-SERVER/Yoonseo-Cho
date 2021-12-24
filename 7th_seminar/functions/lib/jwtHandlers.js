const functions = require('firebase-functions');
const jwt = require('jsonwebtoken');
const { TOKEN_INVALID, TOKEN_EXPIRED } = require('../constants/jwt');

/* accessToken 만들기 */
const secretKey = process.env.JWT_SECRET; // JWT를 발급, 인증 시 필요한 secretKey
const options = {
  algorithm: 'HS256',
  expiresIn: '30d',
  issuer: 'wesopt',
};

// id, email, name, idFirebase가 담긴 JWT 발급
const sign = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name || null,
    idFirebase: user.idFirebase,
  };

  const result = {
    accesstoken: jwt.sign(payload, secretKey, options),
  };
  return result;
};

/* accessToken 검증하기 */
const verify = (token) => {
  let decoded;
  try {
    decoded = jwt.verify(token, secretKey);
  } catch (err) {
    if (err.message === 'jwt expired') {
      console.log('expired token');
      functions.logger.error('expired token');
      return TOKEN_EXPIRED;
    } else if (err.message === 'invalid token') {
      console.log('invalid token');
      functions.logger.error('invalid token');
      return TOKEN_INVALID;
    } else {
      console.log('invalid token');
      functions.logger.error('invalid token');
      return TOKEN_INVALID;
    }
  }
  // 해독된 JWT 반환
  return decoded;
};

module.exports = {
  sign,
  verify,
};
