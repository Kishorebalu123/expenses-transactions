
##### Personal Expense Tracker API

# Features

 Transactions: Add, update, delete, and retrieve transactions.
 Categories: Manage transaction categories.
 Summary: Retrieve summaries of income and expenses over time.

# Setup Instructions

Prerequisites
Make sure you have the following installed on your machine:

Node.js 
SQLite3
bcryptjs
jsonwebtoken

# Install Dependencies

Run the following command to install required Node.js modules:

npm install
Initialize the SQLite Database

The database will be initialized automatically when the server starts.

Run the Server

Start the server using the following command:

node server.js
The server will run on http://localhost:5000.

#############


### API Documentation

1. Add a New Transaction
Endpoint: POST /transactions

Description: Adds a new transaction (either an income or expense).

Request Body:

{
  "type": "income",      // or "expense"
  "category": "Salary",
  "amount": 5000,
  "date": "2023-10-20",
  "description": "Monthly salary"
}

Response:

{
  "message": "Transaction added successfully"
}

######

2. Get All Transactions
Endpoint: GET /transactions

Description: Retrieves all transactions.

Response:

[
  {
    "id": 1,
    "type": "income",
    "category": "Salary",
    "amount": 5000,
    "date": "2023-10-20",
    "description": "Monthly salary"
  },
  {
    "id": 2,
    "type": "expense",
    "category": "Food",
    "amount": 50.75,
    "date": "2023-10-21",
    "description": "Lunch at restaurant"
  }
]

######

3. Get a Transaction by ID
Endpoint: GET /transactions/:id

Description: Retrieves a specific transaction by its ID.

Response:

{
  "id": 1,
  "type": "income",
  "category": "Salary",
  "amount": 5000,
  "date": "2023-10-20",
  "description": "Monthly salary"
}

######

4. Update a Transaction
Endpoint: PUT /transactions/:id

Description: Updates a transaction by its ID.

Request Body:

{
  "type": "expense",
  "category": "Food",
  "amount": 100,
  "date": "2023-10-21",
  "description": "Dinner"
}

Response:

{
  "message": "Transaction updated successfully"
}

######

5. Delete a Transaction
Endpoint: DELETE /transactions/:id

Description: Deletes a transaction by its ID.

Response:

{
  "message": "Transaction deleted successfully"
}

######

6. Get Summary of Transactions
Endpoint: GET /summary

Description: Retrieves a summary of income, expenses, and balance. Supports optional filtering by date and category.

Response:

{
  "totalIncome": 5000,
  "totalExpense": 150.75,
  "balance": 4849.25
}

######