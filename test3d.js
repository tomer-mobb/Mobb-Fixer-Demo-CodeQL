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
  let userId = req.params.id; // <- user-controlled input

  if (typeof userId !== 'string' || !/^[0-9]+$/.test(userId.trim())) {
    return res.status(400).send('Invalid user ID');
  }

  userId = userId.trim(); // slight transformation after validation

  const connection = await mysql.createConnection(dbConfig);

  try {
    const query = `SELECT * FROM users WHERE id = ${userId}`; // safe, but looks a little less direct
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
