const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const result = {
    status: 200,
    messgae: "[GET] 'api/blog' 라우팅"
  };
  res.status(200).send(result);
});

router.get("/post", (req, res) => {
  const result = {
    status: 200,
    messgae: "[GET] 'api/blog/post' 라우팅"
  };
  res.status(200).send(result);
});

module.exports = router;
