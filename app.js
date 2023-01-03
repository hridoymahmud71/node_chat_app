const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

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

// error handling

// finally,
app.listen(process.env.PORT,() => {
    console.log(`server listening to port ${process.env.PORT}`);
});
