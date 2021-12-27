const express = require("express");
const router = express.Router();

router.get("/", require("./postListGET"));
router.get("/:id", require("./postDetailGET"));
router.post("/", require("./postPOST"));
router.put("/:id", require("./postPUT"));
router.delete("/:id", require("./postDELETE"));

module.exports = router;
