const { check, validationResult } = require("express-validator");

const doLoginValidators = [
    check("username")
    .isLength({ min: 1 })
    .withMessage("Email or phone is required")   
    .trim(),
    check("password")
    .isLength({ min: 1 })
    .withMessage("Password is required")   
];

function doLoginValidationHandler(req,res,next) {
    const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors) == 0) {
    next();
  } else {   

    // show inbox page again
    res.render("inbox", {
        data:{
            username:req.body.username
        },
        errors:mappedErrors
    });
  }
}

module.exports = {
    doLoginValidators,
    doLoginValidationHandler
}