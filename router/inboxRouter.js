// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getInbox,search,addConversation } = require("./../controller/inboxController");
const decoratedHtmlResponse = require("./../middlewares/common/decoratedHtmlResponse");
const checkLogin = require("./../middlewares/common/checkLogin");



// login page
router.get("/",decoratedHtmlResponse("Inbox"),checkLogin, getInbox);

// search conversation
router.post("/search",checkLogin, search);

// add a conversation
router.post("/conversation",checkLogin, addConversation);

module.exports = router;