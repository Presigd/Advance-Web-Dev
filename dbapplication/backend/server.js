const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.use(express.static('public')); //serve static files from the 'public' directory


// Open a database connection
let db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to the SQLite database');
    
    // Create a table
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, country TEXT, capital TEXT)', (err) => {
      if (err) {
        console.error('Error creating table', err.message);
      }
    });
  }
});

// Handle POST requests to add a new user
app.post('/addUser', (req, res) => {
  const { country, capital } = req.body;
  db.run('INSERT INTO users (country, capital) VALUES (?, ?)', [country, capital], function(err) {
    if (err) {
      console.error('Error inserting data', err.message);
      res.status(500).send('Error inserting data');
    } else {
      console.log(`A row has been inserted with rowid ${this.lastID}`);
      res.status(200).send(`A row has been inserted with rowid ${this.lastID}`);
    }
  });
});

// Handle GET requests to retrieve all users
app.get('/getUsers', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
      if (err) {
        console.error('Error retrieving data', err.message);
        res.status(500).send('Error retrieving data');
      } else {
        res.status(200).json(rows);
      }
    });
  });

// Handle PUT requests to update a user
app.put('/updateUser/:id', (req, res) => {
    const { id } = req.params;
    const { country, capital } = req.body;
    db.run('UPDATE users SET country = ?, capital = ? WHERE id = ?', [country, capital, id], function(err) {
      if (err) {
        console.error('Error updating data', err.message);
        res.status(500).send('Error updating data');
      } else {
        console.log(`Row(s) updated: ${this.changes}`);
        res.status(200).send(`Row(s) updated: ${this.changes}`);
      }
    });
  });

// Handle DELETE requests to delete a user
app.delete('/deleteUser/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM users WHERE id = ?', id, function(err) {
      if (err) {
        console.error('Error deleting data', err.message);
        res.status(500).send('Error deleting data');
      } else {
        console.log(`Row(s) deleted: ${this.changes}`);
        res.status(200).send(`Row(s) deleted: ${this.changes}`);
      }
    });
  });

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Close the database connection when the app stops
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database connection', err.message);
    } else {
      console.log('Closed the database connection');
    }
    process.exit(0);
  });
});
