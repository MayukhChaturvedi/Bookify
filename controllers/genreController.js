const Genre = require('../models/genre');
const Book = require('../models/book');
const asyncHandler = require('express-async-handler');

exports.genre_list = asyncHandler(async (req, res, next) => {
	const allGenres = await Genre.find().sort({ name: 1 });
	res.json(allGenres);
});

exports.genre_display = asyncHandler(async (req, res, next) => {
	const reqGenre = await Genre.find({ _id: req.params.id });
	res.json(reqGenre);
});

exports.genre_create_post = asyncHandler(async (req, res, next) => {
	const genreExists = await Genre.findOne({ name: req.body.name })
		.collation({ locale: 'en', strength: 2 })
		.exec();

	if (genreExists) {
		res.send('Item already exists');
	} else {
		const genre = new Genre(req.body);
		await genre.save();
		res.send('Item appended successfully');
	}
});

exports.genre_delete_delete = asyncHandler(async (req, res, next) => {
	console.log(req.params.id);
	try {
		const books = await Book.findOne({ genre: req.params.id }, 'title');
		if (books) {
			res
				.status(269)
				.send(
					'Cannot delete item. Must delete its references (books/book instances) first'
				);
		} else {
			await Genre.findByIdAndDelete(req.params.id);
			res.status(200).send('Item deleted successfully');
		}
	} catch (e) {
		console.log(e);
		res.status(400).send('Error. Check console.');
	}
});

exports.genre_update_put = asyncHandler(async (req, res, next) => {
	console.log(req.body);
	await Genre.findOneAndReplace({ _id: req.params.id }, req.body);
	res.send('Item Updated successfully');
});
