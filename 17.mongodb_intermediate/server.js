const { configDotenv } = require("dotenv");
const express = require("express");
const connectToDB = require("./database/db");
const productRouter = require("./router/product.router");
const bookRouter = require("./router/book.router");

configDotenv("./.env");

connectToDB();

const app = express();

app.use(express.json());

app.use('/api/products' , productRouter);
app.use('/api/book' , bookRouter);

const port = process.env.PORT || 3000;


app.listen(port , () => {
  console.log(`Server is running on port ${port}`);
})