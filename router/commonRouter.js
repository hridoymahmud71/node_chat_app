// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { unauthorized, nomatch } = require("./../controller/commonController");
const decoratedHtmlResponse = require("./../middlewares/common/decoratedHtmlResponse");

// default
router.get(
  "/unauthorized",
  decoratedHtmlResponse("Unauthorized"),
  unauthorized
);
router.get("/nomatch", nomatch);

module.exports = router;
