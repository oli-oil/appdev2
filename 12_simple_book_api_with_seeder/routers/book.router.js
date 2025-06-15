const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller.js');
const auth = require('../middlewares/auth-validator.middleware.js');

// All routes require authentication
router.use(auth);

// Get all books
router.get('/', bookController.getAllBooks);

// Get single book
router.get('/:id', bookController.getBookById);

// Create new book
router.post('/', bookController.createBook);

// Update book
router.patch('/:id', bookController.updateBook);

// Delete book
router.delete('/:id', bookController.deleteBook);

module.exports = router;
