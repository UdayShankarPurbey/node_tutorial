const express = require('express');
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/book.controllers');

const router = express.Router();

router.get('/get', getAllBooks);
router.get('/get/:id', getBookById);
router.post('/add', createBook);
router.put('/update/:id', updateBook);
router.delete('/delete/:id', deleteBook);

module.exports = router;
