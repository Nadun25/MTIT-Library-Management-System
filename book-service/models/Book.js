const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true,
        trim: true
    },
    publishedYear: {
        type: Number,
        min: 1000,
        max: 2100
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true // automatically adds createdAt & updatedAt
});

module.exports = mongoose.model('Book', bookSchema);