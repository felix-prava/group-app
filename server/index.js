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
app.post('/api/groups', (req, res) =>{
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

//Get all the groups
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

//Get a group based on id
app.get('/api/groups/:id', (req, res) =>{
    db.query('SELECT * FROM pgroups WHERE id = ' + req.params.id,
    (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Get the teams for a specific group
app.get('/api/groups/owned/:id', (req, res) =>{
    db.query('SELECT * FROM pgroups WHERE group_id = ' + req.params.id,
    (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Adding persons into the a group
app.post('/api/people', (req, res) =>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const job = req.body.job;
    const groupId = req.body.groupId;

    db.query('INSERT INTO people (first_name, last_name, job, group_id) VALUES (?, ?, ?, ?)', [firstName, lastName, job, groupId],
    (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send("Values inserted!");
        }
    });
});

//Getting all the people
app.get('/api/people', (req, res) =>{
    db.query('SELECT * FROM people',
    (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Getting a specific person
app.get('/api/people/:id', (req, res) =>{
    db.query('SELECT * FROM people WHERE id = ' + req.params.id,
    (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Getting all people from a group
app.get('/api/groups/people/:id', (req, res) =>{
    db.query('SELECT * FROM people WHERE group_id = ' + req.params.id,
    (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Move a person to another group
app.patch('/api/people/:id', (req, res) =>{
    const id = req.params.id;
    const groupId = req.body.groupId;
    db.query('UPDATE people SET group_id = ? WHERE id = ?', [groupId, id],
    (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Edit a person
app.patch('/api/people/edit/:id', (req, res) =>{
    const id = req.params.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const job = req.body.job;
    db.query('UPDATE people SET first_name = ?, last_name = ?, job = ?  WHERE id = ?', [firstName, lastName, job, id],
    (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Edit the name of a group
app.patch('/api/groups/edit/:id', (req, res) =>{
    const id = req.params.id;
    const groupName = req.body.groupName;
    db.query('UPDATE pgroups SET group_name = ?  WHERE id = ?', [groupName, id],
    (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//Move a group to another group
app.patch('/api/groups/:id', (req, res) =>{
    const id = req.params.id;
    const groupId = req.body.groupId;
    db.query('UPDATE pgroups SET group_id = ? WHERE id = ?', [groupId, id],
    (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
});




 //Getting all the people with their group
app.get('/api/people-team', (req, res) =>{
    db.query('SELECT people.first_name, people.last_name, people.job, pgroups.group_name FROM people INNER JOIN pgroups ON people.group_id=pgroups.id',
    (err, result) => {
        if (err){
            console.log(err);
        } else {
            res.send(result);
        }
    });
}); 