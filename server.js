const mysql = require('mysql2');
const inquirer = require('inquirer');
const express = require('express')
const db = require('./db/connection');
const PORT = process.env.PORT || 3003;
const app = express();
const chalk = require('chalk');
const figlet = require('figlet');
const cTable = require('console.table');
// require('events').EventEmitter.prototype._maxListeners = 100;

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
    var sql = `SELECT department.id AS id, department.name AS department FROM department`;
    db.query(sql, (err, results) => {
        if (err) throw error;
        else console.log(`Department List:`);
        console.table(results);
        userPrompt();
    })
    userPrompt();
};

// View all roles
const viewAllRoles = () => {
    const sql = `SELECT role.id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, results) => {
        if (err) throw error;
        else console.log(`Current Roles:`);
        console.table(results);
        userPrompt();
    })
    userPrompt();
}

// View all employees
const viewAllEmployees = () => {
    var sql = `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id ORDER BY employee.id ASC;`;
    db.query(sql, (err, results) => {
        if (err) throw error;
        else console.log(`Current Employees:`);
        console.table(results);
        userPrompt();
    })
};

// Add department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDept',
            message: 'What is the name of the new department?',
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log("Please enter the department name");
                    return false;
                }
            }
        }
    ])
        .then((answer) => {
            var sql = `INSERT INTO department (name) VALUES (?)`;
            db.query(sql, answer.newDept, (err) => {
                if (err) throw error;
                viewAllDepartments();
                userPrompt();
            })
        })
}

// Add role
const addRole = () => {
    const sql = 'SELECT * FROM department'
    db.query(sql, (err, results) => {
        if (err) throw error;
        let deptArray = [];
        results.forEach((department) => { deptArray.push(department.name); });
        inquirer.prompt([
            {
                type: 'list',
                name: 'deptName',
                message: 'Which department is this new role in?',
                choices: deptArray
            }
        ])
            .then((answer) => {
                roleInfo(answer);
            });

        const roleInfo = (deptInfo) => {
            inquirer
                .prompt([
                    {
                        name: 'roleTitle',
                        type: 'input',
                        message: 'What is the name of the new role?'
                    },
                    {
                        name: 'salary',
                        type: 'input',
                        message: 'What is the salary of the new role?'
                    }
                ])
                .then((answer) => {
                    let newRole = answer.roleTitle;
                    let departmentId;

                    results.forEach((department) => {
                        if (deptInfo.deptName === department.name) { departmentId = department.id; }
                    });

                    let sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
                    let addedRole = [newRole, answer.salary, departmentId];

                    db.query(sql, addedRole, (error) => {
                        if (error) throw error;
                        viewAllRoles();
                        userPrompt();
                    });
                });
        };
    });
};

// Add employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's first name");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?",
            validate: userInput => {
                if (userInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's last name");
                    return false;
                }
            }
        }
    ])
        .then(answer => {
            const newEmployee = [answer.firstName, answer.lastName]
            const newEmployeeRole = `SELECT role.id, role.title FROM role`;
            db.query(newEmployeeRole, (err, data) => {
                if (err) throw error;
                const roles = data.map(({ id, title }) => ({ name: title, value: id }))
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: "What is this employee's role?",
                        choices: roles
                    }
                ])
                    .then(roleChoice => {
                        const role = roleChoice.role;
                        newEmployee.push(role);
                        const newEmployeeManager = `SELECT * FROM employee`;
                        db.query(newEmployeeManager, (err, data) => {
                            if (err) throw error;
                            const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));
                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'manager',
                                    message: "Who is this employee's manager?",
                                    choices: managers
                                }
                            ])
                                .then(managerChoice => {
                                    const newManager = managerChoice.manager;
                                    newEmployee.push(newManager);
                                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                                    db.query(sql, newEmployee, (err) => {
                                        if (err) throw error;
                                        else console.log("The new employee has successfully been added to the database");
                                        viewAllEmployees();
                                        userPrompt();
                                    })
                                })
                        })
                    })
            })
        })
};

// Update employee role
const updateEmployee = () => {
    // let employeeArr = [];
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, results) => {
        let employeeArr = [];
        results.forEach((employee) => {employeeArr.push(`${employee.first_name} ${employee.last_name}`);});
        
        let sql = `SELECT role.id, role.title FROM role`;
        db.query(sql, (err, results) => {
            if (err) throw error;
            let roleArr = [];
            results.forEach((role) => { roleArr.push(role.title); });

        inquirer.prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: 'Enter the ID of the employee to update their role',
            },
            {
                type: 'input',
                name: 'newRole',
                message: 'Enter the ID of the new role for the employee',
            }
        ])
            .then(function (results) {
                const employeeId = results.employeeId;
                const newRole = results.newRole;
                const sql = `UPDATE employee SET role_id = ${newRole} WHERE id = ${employeeId}`;
                db.query(sql, () => {
                    console.table(results);
                    viewAllEmployees();
                    userPrompt();
                })
            })
    
        });
    }
    )};

// Start server after DB connection
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});