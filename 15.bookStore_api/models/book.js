const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Book Title is Required"],
    trim: true,
    maxLength: [1000, "Book Title max length is 1000"],
  },
  author: {
    type: String,
    required: [true, "Author Name is Required"],
  },
  publicationYear: {
    type: Number,
    required: [true, "Publication Year is Required"],
    min: [1800, "Publication Year should be after 1800"],
    max: [
      new Date().getFullYear(),
      "Publication Year should be before current year",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
