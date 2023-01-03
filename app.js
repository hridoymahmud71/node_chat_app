// external imports
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

// internal imports
const {notFoundHandler,errorHandler} = require("./middlewares/common/errorHandler");

// router imports
const loginRouter = require("./router/loginRouter");
const userRouter = require("./router/userRouter");
const inboxRouter = require("./router/inboxRouter");

const app = express();
dotenv.config();

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //console.log("database connected");
  })
  .catch((err) => {
    //console.log("mongo connection error: \n",err);
  });

//  request parameters
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/",loginRouter);
app.use("/user",userRouter);
app.use("/inbox",inboxRouter);

// <error handling> 

// 404 not found handler
app.use(notFoundHandler);

// default error handler
app.use(errorHandler);

// </error handling> 

// finally,
app.listen(process.env.PORT,() => {
    console.log(`server listening to port ${process.env.PORT}`);
});
