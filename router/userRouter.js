// external imports
const express = require("express");
const router = express.Router();

// internal imports
const {
  getUsers,
  getUser,
  addUser,
  editUser,
  deleteUser,
} = require("./../controller/userController");
const decoratedHtmlResponse = require("./../middlewares/common/decoratedHtmlResponse");
const checkLogin = require("./../middlewares/common/checkLogin");
const requireRole = require("./../middlewares/common/requireRole");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidator,
  editUserValidator,
  editUserValidatorWithPassword,
  editUserValidatorHandler,
  addUserValidatorHandler,
} = require("../middlewares/users/userValidators");

// users page
router.get(
  "/",
  decoratedHtmlResponse("Users"),
  checkLogin,
  requireRole(["admin"]),
  getUsers
);

router.get("/:id", checkLogin, getUser);

// add user
router.post(
  "/",
  checkLogin,
  requireRole(["admin"]),
  avatarUpload,
  addUserValidator,
  addUserValidatorHandler,
  addUser
);

router.put(
  "/:id",
  checkLogin,
  requireRole(["admin"]),
  avatarUpload,
  editUserValidator,
  editUserValidatorHandler,
  editUser
);

router.delete("/:id", deleteUser);

module.exports = router;
