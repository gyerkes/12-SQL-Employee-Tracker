# 12 SQL Employee Tracker

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This is a command-line application to manage a company's database using node, inquirer, and mysql.

## Table of Contents
* [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Testing](#testing)
  * [Questions](#questions)

<a name="installation"/>

## Installation

From the root directory  run "npm install".  Browse to the  db directory and login to mysql.  Once in the db folder got to mysql prompt and enter "sourc schema.sql" then "source seeds.sql". Move back to root directory and run "npm start".

<a name="usage"/>

## Usage

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, 
view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all rolesTHEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, 
last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a departmentT
HEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee roleTHEN I am prompted to select an employee to update and their new role and this information is updated in the database 

https://watch.screencastify.com/v/YJOGGH7krgkSm3MGBAyN

<a name="license"/>

## License

[MIT](https://opensource.org/license/mit-0/)


<a name="Contributing"/>

## Contributing

no contributors


<a name="testing"/>

## Testing

no tests for this application

<a name="questions"/>

## Questions

[Email me](mailto:gly80@comcast.net)


