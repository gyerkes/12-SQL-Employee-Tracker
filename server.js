const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'Bluejeep',
    database: 'tracker_db'
  },
  console.log(`Connected to the tracker_db database.`)
);

db.connect(function (err) {
    if (err) throw err

    questionPrompt()
})

function questionPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'question',
            message: 'Please select what you would like to do.',
            choices:[
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
            ]
        }
    ]).then((choice) => {
        switch(choice.question) {
            case 'View All Employees':
                viewEmployees()
                break
            case 'Add Employee':
                addEmployee()
                break
            case 'Update Employee Role':
                updateRole()
                break
            case 'View All Roles':
                viewRoles()
                break
            case 'Add Role':
                addRole()
                break
            case 'View All Departments':
                viewDepartments()
                break
            case 'Add Department':
                addDepartment()
                break
            case 'Quit':
                console.log('Thank You and Have A Nice Day!!')
                db.end()
                break
        }
    })
}

function viewDepartments() {
    const sql = `SELECT department.id, department.name AS Department FROM department;`
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(res);
        questionPrompt();
    });
};

function viewRoles() {
    const sql = `SELECT role.id, role.title AS role, role.salary, department.name AS department FROM role INNER JOIN department ON (department.id = role.department_id);`;
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(res);
        questionPrompt();
    });
};

function viewEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN role ON (role.id = employee.role_id) INNER JOIN department ON (department.id = role.department_id) ORDER BY employee.id;`
    db.query(sql, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        console.table(res);
        questionPrompt();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department?',
        }
    ]).then((answer) => {
        const sql = `INSERT INTO department(name) VALUES('${answer.department}');`
        db.query(sql, (err, res) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Added " + answer.department + " to the database")
            questionPrompt();
        });
    });
};

function addRole() {
    const role = `SELECT * FROM department`;
    db.query(role, (error, response) => {
        departmentList = response.map(departments => ({
            name: departments.name,
            value: departments.id
        }));
        return inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?',
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which Department does the role belong to?',
                choices: departmentList
            }
        ]).then((answers) => {
            const sql = `INSERT INTO role SET title='${answers.title}', salary= ${answers.salary}, department_id= ${answers.department};`
            db.query(sql, (err, res) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("Added " + answers.title + " to the database")
                questionPrompt();
            });
        });
    });
};

function addEmployee() {
    const worker = `SELECT * FROM employee`;
    db.query(worker, (error, response) => {
        employeeList = response.map(employees => ({
            name: employees.first_name.concat(" ", employees.last_name),
            value: employees.id
        }));

    const employeeRole = `SELECT * FROM role`;
    db.query(employeeRole, (error, response) => {
        roleList = response.map(role => ({
            name: role.title,
            value: role.id
        }));
            return inquirer.prompt([
                {
                    type: 'input',
                    name: 'first',
                    message: "What is the employee's first name?",
                },
                {
                    type: 'input',
                    name: 'last',
                    message: "What is the employee's last name?",
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's role?",
                    choices: roleList
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the employee's manager?",
                    choices: employeeList
                }
            ]).then((answers) => {
                const sql = `INSERT INTO employee SET first_name='${answers.first}', last_name= '${answers.last}', role_id= ${answers.role}, manager_id=${answers.manager};`
                db.query(sql, (err, res) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Added " + answers.first + " " + answers.last + " to the database")
                    questionPrompt();
                });
            });
        });
    });
};

function updateRole() {
    const role = `SELECT * FROM employee`;
    db.query(role, (error, response) => {
        employeeList = response.map(employees => ({
            name: employees.first_name.concat(" ", employees.last_name),
            value: employees.id
        }));
        const upRole = `SELECT * FROM role`;
        db.query(upRole, (error, response) => {
            roleList = response.map(role => ({
                name: role.title,
                value: role.id
            }));
            return inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: "Which employee's role do you want to update?",
                    choices: employeeList
                },
                {
                    type: 'list',
                    name: 'role',
                    message: "Which role do you want to assign the selected employee?",
                    choices: roleList
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: "Who will be this employee's manager?",
                    choices: employeeList
                },
                
            ]).then((answers) => {
                const sql = `UPDATE employee SET role_id= ${answers.role}, manager_id=${answers.manager} WHERE id =${answers.employee};`
                db.query(sql, (err, res) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Employee role updated")
                    questionPrompt();
                });
            });
        });
    });
};
