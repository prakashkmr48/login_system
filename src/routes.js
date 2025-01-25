const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./database');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, hashedPassword],
    (err) => {
      if (err) {
        return res.status(400).send('Username already exists.');
      }
      res.send('Registration successful!');
    }
  );
});

// Login User
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  db.get(
    `SELECT * FROM users WHERE username = ?`,
    [username],
    async (err, user) => {
      if (err || !user) {
        return res.status(400).send('Invalid username or password.');
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (isPasswordCorrect) {
        res.send('Login successful!');
      } else {
        res.status(400).send('Invalid username or password.');
      }
    }
  );
});

module.exports = router;
