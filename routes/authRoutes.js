const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.post("/register", (req, res) => {
  const db = req.app.locals.db;   // Access the db from app locals
  if (!db) {
    return res.status(500).json({ error: "Database not initialized" });
  }
  registerUser(req, res, db);
});

authRouter.post("/login", (req, res) => {
  const db = req.app.locals.db; 
  if (!db) {
    return res.status(500).json({ error: "Database not initialized" });
  }
  loginUser(req, res, db);
});

module.exports = authRouter;
