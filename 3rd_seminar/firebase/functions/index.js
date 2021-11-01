const admin = require('firebase-admin'); // admin 객체 : firebase functions을 실행할 수 있게 해줌
const serviceAccount = require('./wesopt29-34a25-firebase-adminsdk-a3pkj-4033203b86.json'); // admin권한을 얻기 위해 제공하는 일종의 비밀번호
const dotenv = require('dotenv');

dotenv.config();

let firebase;
if (admin.apps.length === 0) {
  firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  firebase = admin.app();
}

module.exports = {
  api: require('./api'),
};
