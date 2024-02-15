// Import the express module
const express = require('express');

// Convert the request body to json
const bodyParser = require('body-parser');

// use the routes
const taskRoutes = require('./routes/taskRoutes');

// Import the token
const authMiddleware = require('./middleware/authMiddleware');

const authUtils = require('./middleware/authUtils');

// Create an instance of the Task class
const app = express();
app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === 'admin' && password === 'admin') {
        const token = authUtils.generateToken({id: 1, username: username});
        res.json({token});
    } else {
        res.status(401).json({message: 'Unauthorized'});
    }

});

app.use(authMiddleware);

app.use('/tasks', taskRoutes);

// Set the port
const PORT = process.env.PORT || 3000;

// a method from express module to create the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});