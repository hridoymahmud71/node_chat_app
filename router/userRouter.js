// external imports
const express = require("express");
const router = express.Router();

// internal imports
const { getUsers,addUser } = require("./../controller/userController");
const decoratedHtmlResponse = require("./../middlewares/common/decoratedHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { addUserValidator,addUserValidatorHandler } = require("../middlewares/users/userValidators");

// login page
router.get("/", decoratedHtmlResponse("Users"), getUsers);

// add user
router.post(
  "/",
  avatarUpload,
  addUserValidator,
  addUserValidatorHandler,
  addUser
);

module.exports = router;
