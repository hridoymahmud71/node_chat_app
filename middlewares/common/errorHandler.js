const createError = require("http-errors");

// 404 not found handler
function notFoundHandler(req, res, next) {
  next(createError("404", "Your route is invalid"));
}

// default error handler
function errorHandler(err, req, res, next) {
  res.locals.errors =
    process.env.NODE_ENV === "development" ? err : { message: err.message };

  res.status(err.status || 500);

  if (res.locals.html) {
    res.render("error", {
      title: "Error Page",
    });
  } else {
    res.json(res.locals.error);
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
