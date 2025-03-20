const mongoose = require("mongoose");

// Connect to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mydb");
    console.log("MongoDB connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
