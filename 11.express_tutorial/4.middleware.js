const express = require('express');

const app = express();

//define middleware function

const myFirstMiddleware = (req, res, next) => {
  console.log('First middleware executed');
  next();
};

app.use(myFirstMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
