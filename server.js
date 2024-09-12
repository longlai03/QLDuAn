const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qlduan'
})

connection.connect(function (err) {
    (err) ? console.log(err) : console.log(connection);
});

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/api/test', (req, res) => {
    res.json({ message: 'This is a message from server' });
})

app.get('/api/project', (req, res) => {
    var sql = "SELECT * FROM project";
    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.json({ project: results })
    })
})
app.get('/api/task', (req, res) => {
    var sql = "SELECT * FROM task";
    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.json({ project: results })
    })
})

app.listen(4000, () => console.log('App listening on port 4000'));