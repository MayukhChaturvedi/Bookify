const BookInstance = require('../models/bookInstance');
const asyncHandler = require('express-async-handler');

exports.bookinstance_list = asyncHandler(async (req, res, next) => {
	const allBookInstances = await BookInstance.find().populate('book').exec();
	res.json(allBookInstances);
});

exports.bookinstance_display = asyncHandler(async (req, res, next) => {
	const reqBookInstance = await BookInstance.find({ _id: req.params.id })
		.populate('book')
		.exec();
	res.json(reqBookInstance);
});

exports.bookinstance_create_post = asyncHandler(async (req, res, next) => {
	console.log(req.body);
	const bookInstance = new BookInstance(req.body);
	await bookInstance.save();
	res.send('Item appended successfully');
});

exports.bookinstance_delete_delete = asyncHandler(async (req, res, next) => {
	console.log(req.params.id);
	try {
		await BookInstance.findByIdAndDelete(req.params.id);
		res.send('Item deleted successfully');
	} catch (e) {
		console.log(e);
		res.send('Error. Check console.');
	}
});

exports.bookinstance_update_put = asyncHandler(async (req, res, next) => {
	console.log(req.body);
	await BookInstance.findOneAndReplace({ _id: req.params.id }, req.body);
	res.send('Item Updated successfully');
});
