const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection configuration
const dbConfig = {
    host: 'bdfikubjeueou3azo7qz-mysql.services.clever-cloud.com',
    user: 'ubsfrixwpcexolna',
    password: 'IVDLyfRvisFvw395LNDr',
    database: 'bdfikubjeueou3azo7qz'
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Generate random password function
const generateRandomPassword = () => {
    return Math.random().toString(36).slice(2); // Generate a random string
};

// Admin login route
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;

    // Example admin credentials (replace with your actual admin credentials)
    const adminCredentials = {
        username: 'admin',
        password: 'admin123'
    };

    if (username === adminCredentials.username && password === adminCredentials.password) {
        res.json({ message: 'Login successful', redirectTo: '/dashboard' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Add new employee route
app.post('/api/admin/employees', (req, res) => {
    const { name, employee_id, department, dob, gender, designation, salary } = req.body;

    // Validate form inputs
    if (!name || !employee_id || !department || !dob || !gender || !designation || !salary) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (name.length > 30) {
        return res.status(400).json({ error: 'Name must be within 30 characters' });
    }

    if (salary < 0 || salary.toString().length > 8) {
        return res.status(400).json({ error: 'Invalid salary' });
    }

    // Generate random password for the employee
    const password = generateRandomPassword();

    // Store employee details in the database
    const sql = 'INSERT INTO employees (name, employee_id, department, dob, gender, designation, salary, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [name, employee_id, department, dob, gender, designation, salary, password];

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error adding employee:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(201).json({ message: 'Employee added successfully', password });
    });
});

// View employees route
app.get('/api/admin/employees', (req, res) => {
    const { sortBy, filterBy, searchBy } = req.query;

    let sql = 'SELECT * FROM employees';
    let filterParams = [];

    if (filterBy && filterBy !== 'all') {
        sql += ' WHERE department = ?';
        filterParams.push(filterBy);
    }

    if (searchBy) {
        if (filterParams.length === 0) {
            sql += ' WHERE';
        } else {
            sql += ' AND';
        }
        sql += ' (name LIKE ? OR employee_id LIKE ?)';
        filterParams.push(`%${searchBy}%`, `%${searchBy}%`);
    }

    if (sortBy) {
        sql += ` ORDER BY ${sortBy}`;
    }

    connection.query(sql, filterParams, (error, results) => {
        if (error) {
            console.error('Error fetching employees:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.json(results);
    });
});

// Delete employee route
app.delete('/api/admin/employees/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId;

    const sql = 'DELETE FROM employees WHERE id = ?';
    connection.query(sql, [employeeId], (error, results) => {
        if (error) {
            console.error('Error deleting employee:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.json({ message: 'Employee deleted successfully' });
    });
});

// Update employee route
app.put('/api/admin/employees/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId;
    const { name, employee_id, department, dob, gender, designation, salary } = req.body;

    // Validate form inputs
    if (!name || !employee_id || !department || !dob || !gender || !designation || !salary) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (name.length > 30) {
        return res.status(400).json({ error: 'Name must be within 30 characters' });
    }

    if (salary < 0 || salary.toString().length > 8) {
        return res.status(400).json({ error: 'Invalid salary' });
    }

    // Update employee details in the database
    const sql = 'UPDATE employees SET name = ?, employee_id = ?, department = ?, dob = ?, gender = ?, designation = ?, salary = ? WHERE id = ?';
    const values = [name, employee_id, department, dob, gender, designation, salary, employeeId];

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error updating employee:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.json({ message: 'Employee updated successfully' });
    });
});

// Create task route
app.post('/api/admin/tasks', (req, res) => {
    const { task_name, task_description, deadline, employee_id } = req.body;

    // Validate form inputs
    if (!task_name || !deadline) {
        return res.status(400).json({ error: 'Task name and deadline are required' });
    }

    const currentDate = new Date();
    const taskDeadline = new Date(deadline);

    if (taskDeadline <= currentDate) {
        return res.status(400).json({ error: 'Deadline must be a future date' });
    }

    // Store task details in the database
    const sql = 'INSERT INTO Tasks (task_name, task_description, deadline, employee_id) VALUES (?, ?, ?, ?)';
    const values = [task_name, task_description, deadline, employee_id];

    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error adding task:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.status(201).json({ message: 'Task added successfully' });
    });
});

// View tasks route
app.get('/api/admin/tasks', (req, res) => {
    const { status } = req.query;

    let sql = 'SELECT * FROM Tasks';
    let filterParams = [];

    if (status && status !== 'all') {
        sql += ' WHERE status = ?';
        filterParams.push(status);
    }

    connection.query(sql, filterParams, (error, results) => {
        if (error) {
            console.error('Error fetching tasks:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.json(results);
    });
});

// Assign task to employee route
app.put('/api/admin/tasks/:taskId/assign', (req, res) => {
    const taskId = req.params.taskId;
    const { employeeId } = req.body;

    // Check if the task exists
    const checkTaskExistsQuery = 'SELECT * FROM Tasks WHERE id = ?';
    connection.query(checkTaskExistsQuery, [taskId], (error, results) => {
        if (error) {
            console.error('Error checking task existence:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Assign task to the employee
        const assignTaskQuery = 'UPDATE Tasks SET employee_id = ?, status = ? WHERE id = ?';
        connection.query(assignTaskQuery, [employeeId, 'Assigned', taskId], (error, results) => {
            if (error) {
                console.error('Error assigning task:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            res.json({ message: 'Task assigned successfully' });
        });
    });
});

// Update task status route
app.put('/api/admin/tasks/:taskId/status', (req, res) => {
    const taskId = req.params.taskId;
    const { status } = req.body;

    // Check if the task exists
    const checkTaskExistsQuery = 'SELECT * FROM Tasks WHERE id = ?';
    connection.query(checkTaskExistsQuery, [taskId], (error, results) => {
        if (error) {
            console.error('Error checking task existence:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Update task status
        const updateStatusQuery = 'UPDATE Tasks SET status = ? WHERE id = ?';
        connection.query(updateStatusQuery, [status, taskId], (error, results) => {
            if (error) {
                console.error('Error updating task status:', error);
                return res.status(500).json({ error: 'Internal server error' });
            }

            res.json({ message: 'Task status updated successfully' });
        });
    });
});

// Task tracking route
app.get('/api/admin/tasks', (req, res) => {
    const { status } = req.query;

    let sql = 'SELECT * FROM Tasks';
    let filterParams = [];

    if (status && status !== 'all') {
        sql += ' WHERE status = ?';
        filterParams.push(status);
    }

    connection.query(sql, filterParams, (error, results) => {
        if (error) {
            console.error('Error fetching tasks:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        res.json(results);
    });
});

// Connect to the database
connection.connect((error) => {
    if (error) {
        console.error('Unable to connect to the database:', error);
    } else {
        console.log('Database connection has been established successfully.');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
