const { configDotenv } = require("dotenv");
const express = require("express");
const connectToDB = require("./database/db");
const bookRoutes = require("./routes/book.routes.js");
configDotenv("./.env");

const app = express();

const PORT = process.env.PORT || 3000;

connectToDB();

app.use(express.json());

//routes
app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // logging the server status
});
