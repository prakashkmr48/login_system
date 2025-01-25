const express = require('express');
const routes = require('./src/routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse form data and JSON
app.use(express.urlencoded({ extended: true }));  // To parse application/x-www-form-urlencoded
app.use(express.json());  // To parse application/json

// Serve static files (login and register pages)
app.use(express.static(path.join(__dirname, 'views')));

// Use routes
app.use('/login', routes);
app.use('/register', routes);

// Root page
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Login System</h1><p>Go to /login to login or /register to register.</p>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
