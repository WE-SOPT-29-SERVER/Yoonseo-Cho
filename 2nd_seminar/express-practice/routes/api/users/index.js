const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const result = {
    status: 200,
    message: "[GET] 'api/users' 라우팅"
  };
  res.status(200).send(result);
});

router.post("/login", (req, res) => {
  const result = {
    status: 200,
    message: "[POST] 'api/users/login' 라우팅"
  };
  res.status(200).send(result);
});

router.post("/signup", (req, res) => {
  const result = {
    status: 200,
    message: "[POST] 'api/users/signup' 라우팅"
  };
  res.status(200).send(result);
});

module.exports = router;
