//post 테이블과 상호작용
const _ = require('lodash');
const convertSnakeToCamel = require('../lib/convertSnakeToCamel');

const getAllPosts = async (client) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "post" p
    WHERE is_deleted = FALSE
    `,
  );
  return convertSnakeToCamel.keysToCamel(rows);
};

const getPostById = async (client, postId) => {
  const { rows } = await client.query(
    `
    SELECT * FROM "post" p
    WHERE id = $1
    AND is_deleted = FALSE
    `,
    [postId],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const updatePost = async (client, postId, title, content) => {
  //원래 객체 먼저 불러오기
  const { rows: existingRows } = await client.query(
    `
    SELECT * FROM "post"
    WHERE id = $1
       AND is_deleted = FALSE
    `,
    [postId],
  );

  if (existingRows.length === 0) return false; // postPUT.js에서 예외처리하기 위함

  //기존 객체와 새로 만든 객체를 merge 시키기
  const data = _.merge({}, convertSnakeToCamel.keysToCamel(existingRows[0]), { title, content });

  const { rows } = await client.query(
    `
    UPDATE "post" p
    SET title = $1, content = $2, updated_at = now()
    WHERE id = $3
    RETURNING *
    `,
    [data.title, data.content, postId],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const addPost = async (client, userId, title, content) => {
  const { rows } = await client.query(
    `
    INSERT INTO post 
    (user_id, title, content)
    VALUES
    ($1, $2, $3)
    RETURNING *
    `,
    [userId, title, content],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

const deletePost = async (client, postId) => {
  const { rows } = await client.query(
    `
    UPDATE "post" u
    SET is_deleted = TRUE, updated_at = now()
    WHERE id = $1
    RETURNING *
    `,
    [postId],
  );
  return convertSnakeToCamel.keysToCamel(rows[0]);
};

module.exports = { getAllPosts, getPostById, updatePost, addPost, deletePost };
