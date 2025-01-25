const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');  // Routes for login and register
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (login and register pages)
app.use(express.static(path.join(__dirname, 'views')));

// Routes for login and register (you might need to define these routes correctly)
app.use('/login', routes);
app.use('/register', routes);

// Serve root page (optional)
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Login System</h1><p>Go to /login to login or /register to register.</p>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
