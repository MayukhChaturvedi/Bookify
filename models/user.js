const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, maxLength: 100 },
		email: { type: String, required: true, maxLength: 100 },
		password: { type: String, required: true, maxLength: 100 },
	},
	{ toJSON: { virtuals: true } }
);

UserSchema.virtual("url").get(function () {
	return `/catalog/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
