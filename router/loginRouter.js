// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getLogin,login,logout } = require("./../controller/loginController");
const { doLoginValidators,doLoginValidationHandler } = require("./../middlewares/login/loginValidators");
const decoratedHtmlResponse = require("./../middlewares/common/decoratedHtmlResponse");

// login page
router.get("/",decoratedHtmlResponse("Login"), getLogin);

// post login
router.post("/login",decoratedHtmlResponse("Login"),doLoginValidators,doLoginValidationHandler,login);


// logout
router.delete("/",logout);

module.exports = router;
