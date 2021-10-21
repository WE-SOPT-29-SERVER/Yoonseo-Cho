const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // 이 경로로 날라오는 get요청을 이 함수로 대응하겠다
  const result = {
    //해당 로직을 실행
    status: 200,
    message: "api~~!"
  };
  res.status(200).send(result);
});

module.exports = router;
