// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getLogin } = require("./../controller/loginController");
const decoratedHtmlResponse = require("./../middlewares/common/decoratedHtmlResponse");

// login page
router.get("/",decoratedHtmlResponse("Login"), getLogin);

module.exports = router;
