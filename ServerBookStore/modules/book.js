//khai bao cau truc Schema va su dung import mongoose
const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    name: String,
    image: String,
    file: String
});

module.exports = mongoose.model("book", bookSchema);
