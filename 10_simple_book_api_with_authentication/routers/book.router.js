const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middleware/auth');

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
