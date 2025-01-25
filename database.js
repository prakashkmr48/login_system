const sqlite3 = require('sqlite3').verbose();
const dbPath = '/tmp/users.db'; // Use the /tmp directory

// Set the path to the database file
const dbPath = path.join(__dirname, 'users.db');

// Initialize SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');

    // Create the users table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      )`,
      (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          console.log('Users table ready.');
        }
      }
    );
  }
});

module.exports = db;
