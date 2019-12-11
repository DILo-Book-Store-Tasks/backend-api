const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    book_name: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true,
        ref: "Genre",
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    desc: {
        type: String,
        required: true,
        trim: true,
    },
    qty: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;