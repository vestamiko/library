const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
    title: String, 
    author: String,
    genre: String,
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model("books", booksSchema);