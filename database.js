const sqlite3 = require('sqlite3').verbose();
const dbPath = '/tmp/users.db'; // Use the /tmp directory

const fs = require('fs');
const dbPath = '/tmp/users.db';

// Ensure the /tmp directory exists
if (!fs.existsSync('/tmp')) {
  fs.mkdirSync('/tmp');
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database connected successfully');
  }
});


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
