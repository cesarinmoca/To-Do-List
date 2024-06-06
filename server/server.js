import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());

const port = 8081;
app.listen(port, ()=> {
    console.log("Listening on port " + port);
})