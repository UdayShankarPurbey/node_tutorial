const express = require('express');

const app = express();

// Root Route

app.get('/', (req, res) => {
  res.send('Welcome to Express App');
});

// get All Products
app.get('/products', (req, res) => {
  const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
  ]
  res.json(products);
});

// get Single Product
app.get('/product/:id', (req, res) => {
  const ProductId = parseInt(req.params.id);
  const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
  ]
  const singleProduct = products.find(product => product.id === ProductId);
  if(singleProduct) {
    res.json(singleProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
})

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});