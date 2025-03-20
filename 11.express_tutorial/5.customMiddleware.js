const express = require('express');

const app = express();

const requestTimeStampLogger = (req , res , next) => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} - ${req.method} - ${req.url}`);
  next();
};

app.use(requestTimeStampLogger);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about' , (req, res) => {
  res.send('About Page');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});