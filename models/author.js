const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema(
	{
		first_name: { type: String, required: true, maxLength: 100 },
		family_name: { type: String, required: true, maxLength: 100 },
		date_of_birth: { type: Date },
		date_of_death: { type: Date },
	},
	{ toJSON: { virtuals: true } }
);

AuthorSchema.virtual('name').get(function () {
	let fullname = '';
	if (this.first_name && this.family_name) {
		fullname = `${this.first_name} ${this.family_name}`;
	}
	return fullname;
});

AuthorSchema.virtual('url').get(function () {
	return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model('Author', AuthorSchema);
