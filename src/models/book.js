const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    book_name: {
      type: String,
      required: true,
      trim: true
    },
    genres: [
      {
        genre: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "Genre",
          trim: true
        }
      }
    ],
    author: {
      type: String,
      required: true,
      trim: true
    },
    desc: {
      type: String,
      required: true,
      trim: true
    },
    cover: {
      type: String,
      required: true,
      trim: true
    },
    qty: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
