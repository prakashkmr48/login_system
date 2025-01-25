const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');  // For hashing passwords
const path = require('path');

const app = express();
const dbPath = path.join(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath);

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve the registration page
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
});

// Handle registration form submission
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Hash the password before storing it
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).send('Server error');
    }

    // Insert the new user into the database
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(query, [username, hashedPassword], (err) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).send('Registration failed');
      }

      res.redirect('/login');
    });
  });
});

// Serve the login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Fetch the user from the database
  const query = 'SELECT * FROM users WHERE username = ?';
  db.get(query, [username], (err, row) => {
    if (err || !row) {
      console.log('Login failed: user not found');
      return res.status(401).send('Login failed');
    }

    // Compare the password with the stored hashed password
    bcrypt.compare(password, row.password, (err, result) => {
      if (result) {
        res.send('Login successful');
      } else {
        res.status(401).send('Login failed: Invalid credentials');
      }
    });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
