//user 테이블과 상호작용하는 파일
const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const addUser = async (client, email, username, phone, idFirebase) => {
  const { rows } = await client.query(
    `
    INSERT INTO "user"
    (email, username, phone, id_firebase)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `,
    [email, username, phone, idFirebase],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const getAllUsers = async (client) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "user" u
    WHERE is_deleted = FALSE
    `,
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

const getUserById = async (client, userId) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "user" u
    WHERE id = $1
      AND is_deleted = FALSE
    `,
    // client.query()의 두 번째 파라미터에는, 쿼리문에 집어넣고 싶은 변수들의 배열을 적는다.
    // $1에는 배열의 첫번째 변수가, $2에는 배열의 두 번째 변수... 이런 식으로 쿼리문에 변수가 들어가게 된다!
    [userId],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]); // 하나의 유저만 가져오기
};

const updateUser = async (client, userId, username, phone) => {
  //원래 객체 먼저 불러오기
  const { rows: existingRows } = await client.query(
    `
    SELECT * FROM "user"
    WHERE id = $1
       AND is_deleted = FALSE
    `,
    [userId],
  );

  if (existingRows.length === 0) return false; // userPUT.js에서 예외처리하기 위함

  //기존 객체와 새로 만든 객체를 merge 시키기
  const data = _.merge({}, convertSnakeToCamel.keysToCamel(existingRows[0]), { username, phone });

  const { rows } = await client.query(
    `
    UPDATE "user" u
    SET username = $1, phone = $2, updated_at = now()
    WHERE id = $3
    RETURNING *
    `,
    [data.username, data.phone, userId],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const deleteUser = async (client, userId) => {
  const { rows } = await client.query(
    `
    UPDATE "user" u
    SET is_deleted = TRUE, updated_at = now()
    WHERE id = $1
    RETURNING *
    `,
    [userId],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = { addUser, getAllUsers, getUserById, updateUser, deleteUser };
