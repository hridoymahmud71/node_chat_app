// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getInbox,search } = require("./../controller/inboxController");
const decoratedHtmlResponse = require("./../middlewares/common/decoratedHtmlResponse");
const checkLogin = require("./../middlewares/common/checkLogin");



// login page
router.get("/",decoratedHtmlResponse("Inbox"),checkLogin, getInbox);
router.post("/search",checkLogin, search);

module.exports = router;