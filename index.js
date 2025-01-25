const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');  // Adjust as needed

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/', routes);

// Serve the root page (optional)
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Login System</h1><p>Go to /login to login or /register to register.</p>');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
