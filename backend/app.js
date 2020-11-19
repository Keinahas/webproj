var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

global.connection = require("./modules/dbconnect");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var registerRouter = require("./routes/register");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// var empRepository = app.locals.connection.getRepository("EMP_DVLPR");
// empRepository
// 	.find()
// 	.then(function(result) {
// 		console.log(result);
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/register", registerRouter);

module.exports = app;
