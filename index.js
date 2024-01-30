// Import necessary modules and routes
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
require('dotenv').config();


// Create an Express application
const app = express();

// Set the port for the server to listen on
const port = process.env.PORT || 4000;

// Set the MongoDB URI for database connection
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://jonneldosadomain:admin123@cluster0.nnl816c.mongodb.net/receipt_hub?retryWrites=true&w=majority";

// Middleware for parsing JSON and handling URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("users", userRoutes)

// Enable CORS for all routes

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event handlers for successful and error MongoDB connections
mongoose.connection.on('open', () => {
  console.log("Connected to MongoDB Atlas.");
});

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Middleware to handle errors and send a 500 status code with an error message
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the Express server and listen on the specified port
if (require.main === module) {
  app.listen(port, () => {
    console.log(`API is now online on port ${port}`);
  });
}

// Export the Express app and Mongoose for testing or external use
module.exports = { app, mongoose };
