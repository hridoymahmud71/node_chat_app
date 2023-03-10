// external imports
const express = require("express");
const http = require("http");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const moment = require("moment");

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");

// router imports
const commonRouter = require("./router/commonRouter");
const loginRouter = require("./router/loginRouter");
const userRouter = require("./router/userRouter");
const inboxRouter = require("./router/inboxRouter");
const callRouter = require("./router/callRouter");

const app = express();
const server = http.createServer(app);
dotenv.config();

// socket creation
const io = require("socket.io")(server);
global.io = io;

//
io.on("connection", (socket) => {
  socket.on("join-call", (conversationId, userId) => {
    console.log("call joined", conversationId, userId);
    socket.join(conversationId);
    socket.to(conversationId).emit("user-connected", userId);


    socket.on('disconnect', () => {
      socket.to(conversationId).emit('user-disconnected', userId)
    })

  });

  
});

// set comment as app locals
app.locals.moment = moment;

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("mongo connection error: \n", err);
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
app.use("/", loginRouter);
// app.use("/default",commonRouter);
app.use("/users", userRouter);
app.use("/inbox", inboxRouter);
app.use("/call", callRouter);

// <error handling>

// 404 not found handler
app.use(notFoundHandler);

// default error handler
app.use(errorHandler);

// </error handling>

// finally,
server.listen(process.env.PORT, () => {
  console.log(`server listening to port ${process.env.PORT}`);
});
