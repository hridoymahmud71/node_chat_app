// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports
const User = require("../models/People");

// get login page
function getLogin(req, res, next) {
  res.render("index");
}

// post login submit
async function login(req, res, next) {
  try {
    // check username
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });


    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        const userObject = {
          userid: user._id,
          username: user.name,
          email: user.email,
          mobile: user.mobile,
          avatar: user.avatar,
          role: user.role,
        };

        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        //   set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        //   set logged in user identifier
        res.locals.loggedInUser = userObject;

        // then redirect to inbox
        res.redirect("/inbox");
       
      } else {
        res.locals.data = {
            username: req.body.username,
          }
        throw createError("Invalid Password, log in failed !");
      }
    } else {
        res.locals.data = {
            username: req.body.username,
          }
      throw createError("No user found, log in failed !");
    }
  } catch (err) {
    // show the index page back again
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
}

function logout(req,res) {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("logged out")
    
}

module.exports = {
  getLogin,
  login,
  logout
};
