import express from 'express';
import cors from 'cors';
import mysql from 'mysql'

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CRUD'
});

//Create a todo
app.post('/api/todos', (req, res) => {
    const { title } = req.body;
    const sql = 'INSERT INTO TODOS (title, completed) VALUES (?, ?)';
    db.query(sql, [title, false], (err, result) => {
        if (err) return res.json({ error: err.message });
        return res.json({
            id: result.insertId,
            title,
            completed: false
        });
    })
})

//Read all todos
app.get('/api/todos', (req, res) => {
    const sql = 'SELECT * FROM TODOS';
    db.query(sql, (err, result) => {
        if (err) return res.json({ errror: err.message });
        return res.json(result);
    })
})

//Update a todo
app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;
    const sql = 'UPDATE TODOS SET title = ?, completed = ? WHERE id = ?';
    db.query(sql, [title, completed, id], (err, result) => {
        if (err) return res.json({ error: err.message });
        return res.json({
            id,
            title,
            completed
        })
    })
})

//Delete a todo
app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM TODOS WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ error: err.message });
        return res.json({ message: 'Todo Deleted '})
    })
})

const port = 8081;
app.listen(port, () => {
    console.log('Listening on port ' + port);
})