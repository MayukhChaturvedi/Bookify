const Book = require('../models/book');
const asyncHandler = require('express-async-handler');
const BookInstance = require('../models/bookInstance');

exports.book_count = asyncHandler(async (req, res, next) => {
	const filter = {};

	if (req.query.author) {
		filter.author = req.query.author;
	}

	if (req.query.genre) {
		filter.genre = req.query.genre;
	}

	const count = await Book.countDocuments(filter);
	res.json(count);
});

exports.book_list = asyncHandler(async (req, res, next) => {
	const filter = {};

	if (req.query.author) {
		filter.author = req.query.author;
	}

	if (req.query.genre) {
		filter.genre = req.query.genre;
	}
	const reqBooks = await Book.find(filter, 'title author summary')
		.sort({ title: 1 })
		.skip(((req.query.skip || 1) - 1) * 10)
		.limit(10)
		.populate('author')
		.exec();

	res.json(reqBooks);
});

exports.book_display = asyncHandler(async (req, res, next) => {
	const reqBook = await Book.find({ _id: req.params.id })
		.populate('author')
		.populate('genre')
		.exec();
	res.json(reqBook);
});

exports.book_create_post = asyncHandler(async (req, res, next) => {
	console.log(req.body);
	const book = new Book(req.body);
	await book.save();
	res.send('Item appended successfully');
});

exports.book_delete_delete = asyncHandler(async (req, res, next) => {
	console.log(req.params.id);
	try {
		const bookinstances = await BookInstance.findOne({ book: req.params.id });
		if (bookinstances) {
			res
				.status(269)
				.send(
					'Cannot delete item. Must delete its references (book instances) first'
				);
		} else {
			await Book.findByIdAndDelete(req.params.id);
			res.status(200).send('Item deleted successfully');
		}
	} catch (e) {
		console.log(e);
		res.status(400).send('Error. Check console.');
	}
});

exports.book_update_put = asyncHandler(async (req, res, next) => {
	console.log(req.body);
	await Book.findOneAndReplace({ _id: req.params.id }, req.body);
	res.send('Item Updated successfully');
});
