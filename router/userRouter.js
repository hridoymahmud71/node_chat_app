// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getUsers,addUser,deleteUser } = require("./../controller/userController");
const decoratedHtmlResponse = require("./../middlewares/common/decoratedHtmlResponse");
const checkLogin = require("./../middlewares/common/checkLogin");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUserValidator,addUserValidatorHandler } = require("../middlewares/users/userValidators");

// login page
router.get("/", decoratedHtmlResponse("Users"),checkLogin, getUsers);

// add user
router.post(
  "/",
  checkLogin,
  avatarUpload,
  addUserValidator,
  addUserValidatorHandler,
  addUser
);

router.delete("/:id", deleteUser);

module.exports = router;
