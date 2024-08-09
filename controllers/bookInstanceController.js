const BookInstance = require('../models/bookInstance');
const asyncHandler = require('express-async-handler');

exports.bookInstance_count = asyncHandler(async (req, res, next) => {
	const filter = {};

	if (req.query.book) {
		filter.book = req.query.book;
	}
	const count = await BookInstance.countDocuments(filter);
	res.json(count);
});

exports.bookinstance_list = asyncHandler(async (req, res, next) => {
	const filter = {};

	if (req.query.book) {
		filter.book = req.query.book;
	}
	const reqBookInstances = await BookInstance.find(filter)
		.skip(((req.query.skip || 1) - 1) * 10)
		.limit(10)
		.populate('book')
		.exec();
	res.json(reqBookInstances);
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
