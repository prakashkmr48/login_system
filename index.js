const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the /tmp directory for SQLite
const dbPath = '/tmp/users.db';

// Ensure the /tmp directory exists
if (!fs.existsSync('/tmp')) {
  fs.mkdirSync('/tmp');
}

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database connected successfully:', dbPath);

    // Create users table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      )
    `;
    db.run(createTableQuery, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Users table is ready');
      }
    });
  }
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Login System. Go to /login or /register.');
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.run(insertQuery, [username, password], (err) => {
    if (err) {
      console.error('Error inserting user:', err);
      res.status(500).send('Registration failed');
    } else {
      res.send('User registered successfully');
    }
  });
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.get(query, [username, password], (err, row) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).send('Login failed');
    } else if (row) {
      res.send('Login successful');
    } else {
      res.send('Invalid credentials');
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
