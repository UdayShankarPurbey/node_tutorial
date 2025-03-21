const Author = require('../models/author');
const NewEditionBook = require('../models/book');

const createAuthor = async (req, res) => {
  try {
    const { name , bio } = req.body;
    const author = await Author.create({
      name, bio
    });
    res.status(201).json({ success: true, message: "Author created successfully", data: author });
  } catch (error) {
    console.log("Error creating author : " + error);
    res.status(500).json({ success : false, message: "Error creating author" });    
  }
};

const createBook = async (req, res) => {
  try {
    const { title, authorId } = req.body;
    const author = await Author.findById(authorId);
    if (!author) {
      return res.status(404).json({ success: false, message: "Author not found" });
    }
    const book = await NewEditionBook.create({title, author : authorId});
    res.status(201).json({ success: true, message: "Book created successfully", data: book });    
  } catch (error) {
    console.log("Error creating book : " + error);
    res.status(500).json({ success : false, message: "Error creating book" });    
  }
};

const getBookWithAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await NewEditionBook.findById(id).populate('author');
    if (!book)
      return res.status(404).json({ success: false, message: "Book not found" });
    res.status(200).json({ success: true, data: book , message: "Book Found successfully" });
    
  } catch (error) {
    console.log("Error getting book with author : " + error);
    res.status(500).json({ success : false, message: "Error getting book with author" });
    
  }
};

module.exports = {
  createAuthor,
  createBook,
  getBookWithAuthor,
}