// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getLogin,login,logout } = require("./../controller/loginController");
const { doLoginValidators,doLoginValidationHandler } = require("./../middlewares/login/loginValidators");
const decoratedHtmlResponse = require("./../middlewares/common/decoratedHtmlResponse");
const alreadyLoggedIn = require("./../middlewares/common/alreadyLoggedIn");

const { unauthorized, nomatch } = require("./../controller/commonController");

// login page
router.get("/",decoratedHtmlResponse("Login"),alreadyLoggedIn, getLogin);

// post login
router.post("/login",decoratedHtmlResponse("Login"),doLoginValidators,doLoginValidationHandler,login);


// logout
router.delete("/",logout);

// default
router.get(
    "/unauthorized",
    decoratedHtmlResponse("Unauthorized"),
    unauthorized
  );
  router.get("/nomatch", nomatch);

module.exports = router;
