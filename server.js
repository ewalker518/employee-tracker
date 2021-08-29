const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express')
const db = require('./db/connection');
const PORT = process.env.PORT || 3003;
const app = express();
const chalk = require('chalk');
const figlet = require('figlet');
const cTable = require('console.table');
// const routes = require('./routes');

// Connect to the database and show title
db.connect((error) => {
    if (error) throw error;
    console.log(chalk.red.bold(`====================================================================================`));       // https://www.npmjs.com/package/chalk
    console.log(``);
    console.log(chalk.yellowBright.bold(figlet.textSync('Employee Tracker')));                                                 // http://www.figlet.org/
    console.log(``);
    console.log(chalk.red.bold(`====================================================================================`));
    userPrompt();
});

// Begin prompts
const userPrompt = () => {
    inquirer.prompt([
        {
        name: 'choices',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Exit'
        ]
        }
    ])

    .then((answers) => {
        const { choices } = answers;

        if (choices === 'View all departments') {
            viewAllDepartments();
        }

        if (choices === 'View all roles') {
            viewAllRoles();
        }

        if (choices === 'View all employees') {
            viewAllEmployees();
        }

        if (choices === 'Add a department') {
            addDepartment();
        }

        if (choices === 'Add a role') {
            addRole();
        }

        if (choices === 'Add an employee') {
            addEmployee();
        }

        if (choices === 'Update an employee role') {
            updateEmployee();
        }

        if (choices === 'Exit') {
            db.end();
        }
    })
};

// View all departments
const viewAllDepartments = () => {
    console.log('Success');
    userPrompt();
}

// View all roles
const viewAllRoles = () => {
    console.log('Success');
    userPrompt();
}

// View all employees
const viewAllEmployees = () => {
    var sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee, role, department WHERE department.id = role.department_id AND role.id - employee.role_id`;
    db.query(sql, (err, response) => {
        if (err) throw error;
        console.log(`Current Employees:`);
        console.table(response);
        userPrompt();
    })
};

// Add department
const addDepartment = () => {
    console.log('Success');
    userPrompt();
}

// Add role
const addRole = () => {
    console.log('Success');
    userPrompt();
}

// Add employee
const addEmployee = () => {
    console.log('Success');
    userPrompt();
}

// Update employee role
const updateEmployee = () => {
    console.log('Success');
    userPrompt();
}

// Start server after DB connection
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});