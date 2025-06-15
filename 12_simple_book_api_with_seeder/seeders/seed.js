const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
const User = require('../models/User');
const Book = require('../models/Book');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/simple_book_api';

async function seed() {
  await mongoose.connect(MONGO_URI);

  // Clear collections
  await User.deleteMany({});
  await Book.deleteMany({});

  // Create fake users
  const users = [];
  for (let i = 0; i < 5; i++) {
    const password = await bcrypt.hash('password123', 10);
    users.push(new User({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password,
    }));
  }
  const savedUsers = await User.insertMany(users);

  // Create fake books
  const books = [];
  for (let i = 0; i < 10; i++) {
    books.push(new Book({
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      userId: savedUsers[Math.floor(Math.random() * savedUsers.length)]._id,
      publishedDate: faker.date.past(),
      summary: faker.lorem.sentences(2),
    }));
  }
  await Book.insertMany(books);

  console.log('Database seeded!');
  mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  mongoose.disconnect();
});