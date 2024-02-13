// Import the express module
const express = require('express');

// Convert the request body to json
const bodyParser = require('body-parser');

// use the routes
const taskRoutes = require('./routes/taskRoutes');

// Create an instance of the Task class
const app = express();
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);

// Set the port
const PORT = process.env.PORT || 3000;

// a method from express module to create the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});