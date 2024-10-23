const addTransaction = async (req, res, db) => {
    const { type, category, amount, date, description } = req.body;
   const userId = req.user.userId
 
    if (!type || !category || !amount || !date) {
      return res.status(400).json({ error: "Required fields are missing" });
    }
  
    const query = `
      INSERT INTO transactions (type, category, amount, date, description, user_id)
      VALUES (?, ?, ?, ?, ?, ?);
    `;
    try {
      await db.run(query, [type, category, amount, date, description, userId]);
      res.status(201).json({ message: "Transaction added successfully" });
    } catch (e) {
      res.status(500).json({ error: `Failed to add transaction: ${e.message}` });
    }
  };
  
  const getTransactions = async (req, res, db) => {
    const userId = req.user.userId;
   
    const query = `SELECT * FROM transactions WHERE user_id = ?;`;
  
    try {
      const transactions = await db.all(query,[userId]);
      res.json(transactions);
    } catch (e) {
      res.status(500).json({ error: `Failed to retrieve transactions: ${e.message}` });
    }
  };
  
  const getTransactionById = async (req, res, db) => {
    const { id } = req.params;
    const userId=req.user.userId
    const query = `SELECT * FROM transactions WHERE id = ? AND user_id = ?;`;
  
    try {
      const transaction = await db.get(query, [id,userId]);
      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.json(transaction);
    } catch (e) {
      res.status(500).json({ error: `Failed to retrieve transaction: ${e.message}` });
    }
  };
  
  const updateTransaction = async (req, res, db) => {
    const { id } = req.params;
    const { type, category, amount, date, description } = req.body;
    const userId = req.user.userId;

    const query = `
      UPDATE transactions
      SET type = ?, category = ?, amount = ?, date = ?, description = ?
      WHERE id = ? AND user_id = ?;
    `;
  
    try {
      const result = await db.run(query, [type, category, amount, date, description,id,userId]);
      if (result.changes === 0) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.json({ message: "Transaction updated successfully" });
    } catch (e) {
      res.status(500).json({ error: `Failed to update transaction: ${e.message}` });
    }
  };
  
  const deleteTransaction = async (req, res, db) => {
    const { id } = req.params;
    const query = `DELETE FROM transactions WHERE id = ? AND user_id = ?;`;
    const userId = req.user.userId;

    try {
      const result = await db.run(query, [id, userId]);
      if (result.changes === 0) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.json({ message: "Transaction deleted successfully" });
    } catch (e) {
      res.status(500).json({ error: `Failed to delete transaction: ${e.message}` });
    }
  };

  
const transactionSummary=  async (req, res, db) => {
    const { startDate, endDate, category } = req.query;
    const userId = req.user.userId;

    let query = `SELECT type, SUM(amount) as total FROM transactions WHERE user_id = ?;`;
    const conditions = [];
    const params = [];
  
    if (startDate && endDate) {
      conditions.push(`date BETWEEN ? AND ?`);
      params.push(startDate, endDate);
    }
  
    if (category) {
      conditions.push(`category = ?`);
      params.push(category);
    }
  
    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ');
    }
  
    query += ` GROUP BY type`;
  
    try {
      const summary = await db.all(query,[userId], params);
      
      let totalIncome = 0;
      let totalExpense = 0;
  
      summary.forEach((row) => {
        if (row.type === "income") {
          totalIncome = row.total;
        } else if (row.type === "expense") {
          totalExpense = row.total;
        }
      });
  
      const balance = totalIncome - totalExpense;
      res.json({ totalIncome, totalExpense, balance });
    } catch (e) {
      res.status(500).json({ error: `Failed to fetch summary: ${e.message}` });
    }
  };
  
  
  module.exports = {
    addTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    transactionSummary
  };
  