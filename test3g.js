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

app.get('/user/:id', async (req, res) => {
  const userId = req.params.id;

  // Basic numeric validation, but directly inside an if-statement
  if (!userId || !userId.match(/^[0-9]+$/)) {
    return res.status(400).send('Invalid user ID');
  }

  const connection = await mysql.createConnection(dbConfig);

  try {
    const query = `SELECT * FROM users WHERE id = ${userId}`; // looks unsafe to many tools
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
