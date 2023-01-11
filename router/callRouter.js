// external imports
const express = require("express");

// internal imports
const { callPage } = require("../controller/callController");
const decoratedHtmlResponse = require("./../middlewares/common/decoratedHtmlResponse");
const checkLogin = require("./../middlewares/common/checkLogin");

const router = express.Router();

// inbox page
router.get("/:conversation_id",decoratedHtmlResponse("Calling..."),checkLogin, callPage);

module.exports = router;
