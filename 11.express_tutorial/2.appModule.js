const express = require('express');

const app = express();


app.set('view engine', 'ejs'); // TODO:   jade -- what is this?

app.get('/', (req, res) => {
  res.send('Home page');
});

app.post('/api/data', (req, res) => {
  res.json({ message: 'Data received' , data : req.body });
});

app.use((err , req , res , next) => {
  console.log(err.stack);
  res.status(500).send('Something broke!');
});