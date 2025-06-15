const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year: { 
        type: Number,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
