var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/api", require("./api")); // "/api" 경로로 들어오는 요청은 (미들웨어) 로 대응하겠다

module.exports = router;
