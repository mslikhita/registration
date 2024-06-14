// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors module

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use cors middleware
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'samartha_recruitment'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// POST route for registration
app.post('/register', (req, res) => {
    console.log('Received registration request:', req.body); // Log received data
    const { user_name, email_id, password, role } = req.body; // Add role here

    // Query to insert new user into the database with role
    const sql = `INSERT INTO user (user_name, email_id, password, role) VALUES (?, ?, ?, ?)`;
    connection.query(sql, [user_name, email_id, password, role], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).send('An error occurred during registration');
            return;
        }
        
        // If insertion was successful
        res.send('Registration successful');
    });
});

// GET route to fetch all users including their roles
app.get('/register', (req, res) => {
    // Query to fetch all users including their roles
    const sql = 'SELECT user_id, user_name, email_id, role FROM user';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).send('An error occurred while fetching users');
            return;
        }
        res.json(results);
    });
});

// GET route to fetch a user by user ID including role
app.get('/register/:user_id', (req, res) => {
    const userId = req.params.user_id;

    // Query to fetch user by user ID including role
    const sql = `SELECT user_id, user_name, email_id, role FROM user WHERE user_id = ?`;
    connection.query(sql, [userId], (err, result) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).send('An error occurred while fetching user');
            return;
        }
        if (result.length > 0) {
            res.json(result[0]); // Send the user object including role
        } else {
            res.status(404).send('User not found');
        }
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
