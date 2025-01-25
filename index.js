const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/', routes);

// Serve static files
app.use(express.static('views'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
