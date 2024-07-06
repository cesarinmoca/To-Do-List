import express from 'express'
import cors from 'cors'
import mysql from 'mysql'

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CRUD'
})

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM STUDENT';
    db.query(sql, (err, result) => {
        if (err) return res.json({Message: 'Error inside server'});
        return res.json(result)
    })
})

app.post('/student', (req, res) => {
    const sql = "INSERT INTO STUDENT ('name', 'email') VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

const port = 8081;
app.listen(8081, ()=> {
    console.log('Listening on port ' + port)
})