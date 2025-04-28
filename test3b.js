const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// Database connection (adjust credentials as needed)
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'testdb'
};

// Utility function to validate userId
function isValidUserId(userId) {
  if (typeof userId !== 'string') {
    return false;
  }
  const cleaned = userId.trim();
  return /^[0-9]+$/.test(cleaned);
}

app.get('/user/:id', async (req, res) => {
  let userId = req.params.id; // <- user-controlled input

  if (!isValidUserId(userId)) {
    return res.status(400).send('Invalid user ID');
  }

  const connection = await mysql.createConnection(dbConfig);

  try {
    userId = userId.trim(); // clean whitespace again for extra confusion
    const query = `SELECT * FROM users WHERE id = ${userId}`; // <- Looks scary but is safe due to validation
    const [rows] = await connection.execute(query);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  } finally {
    await connection.end();
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
