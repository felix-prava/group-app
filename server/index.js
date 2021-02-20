const express = require('express')
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'mysql2424',
    database: 'testdb'
});

app.listen(3001, () => {
    console.log("Port is running on sever 3001..");
});

//Adding groups into the DB
app.post('/api/add-group', (req, res) =>{
    const group = req.body.group;

    db.query('INSERT INTO pgroups (group_name) VALUES (?)', [group],
    (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send("Values inserted!");
        }
    });
});

//Getting all the groups
app.get('/api/groups', (req, res) =>{
    db.query('SELECT * FROM pgroups',
    (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});