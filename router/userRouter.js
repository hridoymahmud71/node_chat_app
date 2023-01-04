// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getUsers } = require("./../controller/userController");
const decoratedHtmlResponse = require("./../middlewares/common/decoratedHtmlResponse");

// login page
router.get("/",decoratedHtmlResponse("Users"), getUsers);

module.exports = router;