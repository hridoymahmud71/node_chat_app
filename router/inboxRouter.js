// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getInbox } = require("./../controller/inboxController");
const decoratedHtmlResponse = require("./../middlewares/common/decoratedHtmlResponse");


// login page
router.get("/",decoratedHtmlResponse("Inbox"), getInbox);

module.exports = router;