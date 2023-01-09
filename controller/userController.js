// external imports
const bcrypt = require("bcrypt");
const { unlink } = require("fs");

// internal imports
const User = require("../models/People");

// get users page
async function getUsers(req, res, next) {
  const users = await User.find();

  res.render("users", { users: users });
}

// get single user for edit
async function getUser(req, res, next) {
  
  try {

    const user =  await User.findById(req.params.id).exec();

    res.status(200).json(user);
    
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not load user",
        },
      },
    });
  }

}

async function addUser(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  //    save user
  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User was added !",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unexpected error !",
        },
      },
    });
  }
}

async function deleteUser(req, res, next) {
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: req.params.id });

    // remove user avatar if has any

    if (deleteUser.avatar) {
      unlink(
        path.join(__dirname, `../public/uploads/avatars/${user.avatar}`),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }

    res.status(200).json({
      message: "User was deleted !",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user!",
        },
      },
    });
  }
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser,
};
