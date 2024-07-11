import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CRUD'
});

db.connect(err => {
    if (err) {
        console.log('Error connecting to the database:' + err);
    }
    console.log('Connected to the MySQL database.');
});

// Create a new todo
app.post('/api/todos', (req, res) => {
    const { title } = req.body;
    const query = 'INSERT INTO TODOS (title, completed) VALUES (?, ?)';
    db.query(query, [title, false], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: result.insertId, title, completed: false});
    });
});

// Get all todos
app.get('/api/todos', (req, res) => {
    const query = 'SELECT * FROM TODOS';
    db.query(query, (err, results) => {
        if (err) {
        return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

  // Update a todo
app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const query = 'UPDATE TODOS SET title = ?, completed = ? WHERE id = ?';
    db.query(query, [title, completed, id], (err) => {
        if (err) {
        return res.status(500).json({ error: err.message });
        }
        res.json({ id, title, completed });
    });
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM TODOS WHERE id = ?';
    db.query(query, [id], (err) => {
        if (err) {
        return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Todo deleted' });
    });
});

const port = 8081;
app.listen(port, () => {
    console.log('Listening on port ' + port);
})