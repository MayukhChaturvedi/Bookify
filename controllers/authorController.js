const Author = require('../models/author');
const asyncHandler = require('express-async-handler');
const Book = require('../models/book');

exports.author_list = asyncHandler(async (req, res, next) => {
	const allAuthors = await Author.find()
		.sort({ family_name: 1 })
		.skip(((req.query.skip || 1) - 1) * 10)
		.limit(10);
	res.json(allAuthors);
});

exports.author_display = asyncHandler(async (req, res, next) => {
	const reqAuthor = await Author.find({ _id: req.params.id });
	res.json(reqAuthor);
});

exports.author_create_post = asyncHandler(async (req, res, next) => {
	console.log(req.body);
	const author = new Author(req.body);
	await author.save();
	res.send('Item appended successfully');
});

exports.author_delete_delete = asyncHandler(async (req, res, next) => {
	console.log(req.params.id);
	try {
		const books = await Book.findOne({ author: req.params.id }, 'title');
		if (books) {
			res
				.status(269)
				.send(
					'Cannot delete item. Must delete its references (books/book instances) first'
				);
		} else {
			await Author.findByIdAndDelete(req.params.id);
			res.status(200).send('Item deleted successfully');
		}
	} catch (e) {
		console.log(e);
		res.status(400).send('Error. Check console.');
	}
});

exports.author_update_put = asyncHandler(async (req, res, next) => {
	console.log(req.body);
	await Author.findOneAndReplace({ _id: req.params.id }, req.body);
	res.send('Item Updated');
});
