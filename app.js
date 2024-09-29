require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: "draft-7",
	legacyHeaders: false,
});

const usersRouter = require("./routes/users");
const catalogRouter = require("./routes/catalog");

const app = express();

app.use("/users", limiter);

app.use(cors());

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const userName = encodeURIComponent(process.env.USER || "");
const password = encodeURIComponent(process.env.PASSWORD || "");

const mongoDB = `mongodb+srv://${userName}:${password}@cluster0.hjxurt4.mongodb.net/bookify_database?retryWrites=true&w=majority&appName=Cluster0`;

main().catch((err) => console.log(err));

async function main() {
	await mongoose.connect(mongoDB);
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send(err.message);
});

module.exports = app;
