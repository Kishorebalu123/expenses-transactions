const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  transactionSummary
} = require("../controllers/transactionController");
const initializeDB = require("../db/db");

const transactionRouter = express.Router();
let db;

// Initialize the database connection and then assign it to the `db` variable.

initializeDB().then(database => {
  db = database;
}).catch(error => {
  console.error(`Failed to initialize database: ${error.message}`);
});

// Middleware to check if db is initialized before processing requests
const checkDbInitialized = (req, res, next) => {
  if (!db) {
    return res.status(500).json({ error: "Database not initialized" });
  }
  next();
};

// Apply the db check middleware to all routes
transactionRouter.use(checkDbInitialized);

transactionRouter.post("/", authenticateToken, (req, res) => addTransaction(req, res, db));
transactionRouter.get("/", authenticateToken, (req, res) => getTransactions(req, res, db));
transactionRouter.get("/:id", authenticateToken, (req, res) => getTransactionById(req, res, db));
transactionRouter.put("/:id", authenticateToken, (req, res) => updateTransaction(req, res, db));
transactionRouter.delete("/:id", authenticateToken, (req, res) => deleteTransaction(req, res, db));
transactionRouter.get("/summary", authenticateToken, (req, res) => transactionSummary(req, res, db));

module.exports = transactionRouter;
