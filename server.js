const express = require("express");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const initializeDB = require("./db/db");

const app = express();
app.use(express.json()); // Use built-in body-parser middleware

// Initialize the database
initializeDB()
  .then(database => {
    app.locals.db = database; // Store the db instance in app locals

    // Set up routes
    app.use("/auth", authRoutes);
    app.use("/transactions", transactionRoutes);

    // Start the server
    app.listen(5000, () => {
      console.log("Server is running at http://localhost:5000/");
    });
  })
  .catch(error => {
    console.error(`Database initialization failed: ${error.message}`);
    process.exit(1);
  });
