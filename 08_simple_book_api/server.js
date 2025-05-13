const express = require("express");
// const BookRoutes = require("./routes/book.route") 
require("dotenv").config() 

const app = express();
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use("/api/books");
const PORT = process.env.PORT || 3333;

var books = [
    { id: 1, title: "The Psychology of Money", author: "Morgan Housel" },
    { id: 2, title: "Atomic Habits", author: "James Clear" },
    { id: 3, title: "Deep Work", author: "Cal Newport" },
    { id: 4, title: "Start with Why: How Great Leaders Inspire", author: "Simon Sinek" },
    { id: 5, title: "The Power of Habit: Why We Do What We Do in Life and Business", author: "Charles Duhigg" }]

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Simple Book API using Node.js and Express");
});

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const bookID = req.params.id;

    const { id } = req.params;
    let book = books.find ((book) => book.id === parseInt(id))
    
    if (!book) {return res.json ("Book not found")}
    
    res.json(book);
});

app.post('/api/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: "Title and Author are required" });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };

  books.push(newBook);
  res.status(200).json(newBook);
});

app.patch('/api/books/:id', (req, res) => {
    const { id } = req.params
    const book = books.find(book => book.id == id);

    if (!book) return res.status(404).send('Book not found');

    const { title, author } = req.body;
    book.title = title ?? book.title;
    book.author = author ?? book.author;
    res.json(book);
});

app.delete('/api/books/:id', (req, res) => {

    const updatedBook = books.filter(b => b.id != req.params.id);

    if (updatedBook.length === books.length) return res.status(404).send(`Book with ID of ${req.params.id} is not found`);

    books = updatedBook;
    res.send('Book deleted successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});