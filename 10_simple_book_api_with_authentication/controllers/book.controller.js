const Book = require('../models/Book');

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new book
exports.createBook = async (req, res) => {
    try {
        console.log('Received request body:', req.body);
        const { title, author } = req.body;

        if (!title || !author) {
            return res.status(400).json({ message: "Title and author are required", receivedData: req.body });
        }

        const newBook = new Book({
            title,
            author
        });

        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update book
exports.updateBook = async (req, res) => {
    try {
        const { title, author } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete book
exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.json({ message: "Book successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
