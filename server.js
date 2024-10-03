const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'qlduan'
});

connection.connect(function (err) {
    (err) ? console.log(err) : console.log(connection);
});

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/api/test', (req, res) => {
    res.json({ message: 'This is a message from server' });
});

app.get('/api/project', (req, res) => {
    const sql = "SELECT * FROM project";
    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.json({ project: results })
    })
});
app.get('/api/task', (req, res) => {
    const sql = "SELECT task.*,project.project_name FROM task JOIN project ON task.project_id = project.project_id";
    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.json({ task: results })
    })
});

app.get('/api/user', (req, res) => {
    const sql = "SELECT * FROM user";
    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.json({ user: results })
    })
});
app.post('/api/insertQLDA', (req, res) => {
    const { projectName, timeStart, timeEnd } = req.body;

    const sql = "INSERT INTO project (project_name, time_start, time_end) VALUES (?, ?, ?)";
    const values = [projectName, timeStart, timeEnd];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error inserting project:', err);
            res.status(500).json({ error: 'Failed to update project' });
            return;
        };
        res.json({ project: results })
    })
});
app.post('/api/insertQLTask', (req, res) => {
    const { projectId, taskName, planStartTime, planEndTime, actualStartTime, actualEndTime, status } = req.body;

    const sql = "INSERT INTO task ( project_id, task_name, plan_start_time, plan_end_time, actual_start_time, actual_end_time, status) VALUES (?,?, ?, ?, ?, ?, ?)";
    const values = [projectId, taskName, planStartTime, planEndTime, actualStartTime, actualEndTime, status];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error inserting project:', err);
            res.status(500).json({ error: 'Failed to update project' });
            return;
        };
        res.json({ task: results })
    })
});

app.get('/api/updateQLDA/:projectId', (req, res) => {
    const { projectId } = req.params;
    const sql = "SELECT * FROM project WHERE project_id = ?";
    connection.query(sql, [projectId], (err, results) => {
        if (err) throw err;
        res.json({ project: results })
    })
});
app.post('/api/updateQLDA/:projectId', (req, res) => {
    const { projectId } = req.params;
    const { projectName, timeStart, timeEnd } = req.body;
    const sql = "UPDATE project SET project_name = ?, time_start = ?, time_end = ? WHERE project_id = ?";
    const values = [projectName, timeStart, timeEnd, projectId];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating project:', err);
            res.status(500).json({ error: 'Failed to update project' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Project not found' });
        } else {
            res.json({ message: 'Project updated successfully' });
        }
    });
});

app.post('/api/deleteQLDA/:projectId', (req, res) => {
    const { projectId } = req.params;
    const sql = "DELETE FROM project WHERE project_id = ?";

    connection.query(sql, [projectId], (err, result) => {
        if (err) {
            console.error('Error updating project:', err);
            res.status(500).json({ error: 'Failed to delete project' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Project not found' });
        } else {
            res.json({ message: 'Project deleted successfully' });
        }
    });
});

app.listen(4000, () => console.log('App listening on port 4000'));