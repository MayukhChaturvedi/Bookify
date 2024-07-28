const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const authorController = require('../controllers/authorController');
const genreController = require('../controllers/genreController');
const bookInstanceController = require('../controllers/bookInstanceController');

router.post('/books/create', bookController.book_create_post);

router.delete('/books/:id/delete', bookController.book_delete_delete);

router.put('/books/:id/update', bookController.book_update_put);

router.get('/books/:id', bookController.book_display);
router.get('/books', bookController.book_list);

router.post('/authors/create', authorController.author_create_post);

router.delete('/authors/:id/delete', authorController.author_delete_delete);

router.put('/authors/:id/update', authorController.author_update_put);

router.get('/authors/:id', authorController.author_display);
router.get('/authors', authorController.author_list);

router.post('/genres/create', genreController.genre_create_post);

router.delete('/genres/:id/delete', genreController.genre_delete_delete);

router.put('/genres/:id/update', genreController.genre_update_put);

router.get('/genres/:id', genreController.genre_display);
router.get('/genres', genreController.genre_list);

router.post(
	'/bookinstances/create',
	bookInstanceController.bookinstance_create_post
);

router.delete(
	'/bookinstances/:id/delete',
	bookInstanceController.bookinstance_delete_delete
);

router.put(
	'/bookinstances/:id/update',
	bookInstanceController.bookinstance_update_put
);

router.get('/bookinstances/:id', bookInstanceController.bookinstance_display);
router.get('/bookinstances', bookInstanceController.bookinstance_list);

module.exports = router;
