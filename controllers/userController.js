require("dotenv").config();
const User = require("../models/user.js");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

exports.signup = asyncHandler(async (req, res, next) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			return next(createError(400, "user already registered"));
		}
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const newUser = await User.create({
			...req.body,
			password: hashedPassword,
		});
		res.status(200).json({ status: "successfully registered" });
	} catch (error) {
		next(error);
	}
});
exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user) {
			return next(createError(404, "user Not found"));
		}
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN, {
				expiresIn: "20m",
			});
			res.status(200).json({ token, name: user.name });
		} else {
			return next(createError(401, "email or password is wrong"));
		}
	} catch (error) {
		next(error);
	}
};
