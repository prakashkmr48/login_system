const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Set the path for the database file
const dbPath = path.join(__dirname, 'users.db');

// Create and connect to the SQLite database (this will create the file if it doesn't exist)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create the users table
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );
`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Users table created.');
  }
});

// Insert some sample data into the users table
db.run(`
  INSERT INTO users (username, password) VALUES
  ('john_doe', 'password123'),
  ('alice_smith', 'securepass'),
  ('bob_jones', '1234abcd');
`, (err) => {
  if (err) {
    console.error('Error inserting sample data:', err.message);
  } else {
    console.log('Sample data inserted.');
  }
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});
