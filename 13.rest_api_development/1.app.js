const express = require('express');

const app = express();

app.use(express.json());

let books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  { id: 3, title: 'Book 3', author: 'Author 3' }
]

// intro route 

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Book API!'
  })
});

//get all books
app.get('/books', (req, res) => {
  res.json(books);
});

//get book by id 
app.get('/book/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));

  if (!book) return res.status(404).json({ message: 'Book not found' });

  res.status(200).json(book);
});

//create a new book 
app.post('/add' , (req, res) => {
  const newBook = {
    id: Math.floor(Math.random() * 100000 + 1),
    title: `Book ${books.length + 1}`,
    author: `Author ${books.length + 1}`
  };
  books.push(newBook);
  res.status(201).json(newBook);
})

//update a book
app.put('/update/:id', (req, res) => {
  const currentBook = books.find(b => b.id === parseInt(req.params.id));
  if (!currentBook) return res.status(404).json({ message: 'Book not found' });
  else {
    currentBook.title = req.body.title || currentBook.title;
    currentBook.author = req.body.author || currentBook.author;
    res.status(200).json({
      message: 'Book updated successfully',
      data : currentBook
    });
  }
})

//delete a book
app.delete('/delete/:id' , (req , res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if(index === -1) return res.status(404).json({ message: 'Book not found' });
  else {
    books.splice(index, 1);
    res.status(200).json({ message: 'Book deleted successfully' });
  }
})

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});