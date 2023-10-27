const inquirer = require("inquirer");
const mysql = require("mysql2");
const chalk = require("chalk");

const db = mysql.createConnection("mysql2://root:password@localhost:3306/employee_db");

// while loop for repeating menu?
let exit = 0;

// view all departments, view all roles, view all employees, 
//add a department, add a role, 
//add an employee, and update an employee role

function addEmployee(firstName, lastName, role, manager) {

}

function addRole(name, salary, department) {

}


function addDepartment(name) {

}


function displayMenu() {
    inquirer
        .prompt([
            /* Pass your questions in here */
            {
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee"
                ],
                name: "menu"
            }
        ])
        .then((answers) => {
            handleMenuChoice(answers.menu);
        })
        .catch((error) => {
            console.log(error);
        });
}

function handleMenuChoice(choice) {
    // while (exit == 0) {
    switch (choice) {
        case "View all departments":
            console.log("All depatments will be displayed");
            displayDepartments();
            break;

        case "View all roles":
            console.log("All roles will be displayed");
            displayRoles();
            displayMenu();
            break;

        case "View all employees":
            console.log("All employees will be displayed");
            displayEmployees();
            break;

        case "Add a department":
            console.log("Department will be added");
            break;

        case "Add a role":
            console.log("Department wil be added");
            break;

        case "Add an employee":
            console.log("Employee will be added");
            break;

        case "Update an employee":
            console.log("Employee will be updated");
            break;

        default:
            console.log("The dafault case was accessed");

    }
    // }
}

function displayDepartments() {
    db.query("SELECT * FROM departments", (err, results) => {
        console.table; (results);
    });
};

function displayRoles() {
    db.query("SELECT * FROM roles", (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log("\n\n");

            console.log(chalk.blue.bold.underline(`ID  Title               Salary     Department`));

            for (let i = 0; i < results.length; i++) {
                let { id, title, salary, department_id } = results[i];

                if (title.length < 20) {
                    title = title + ' '.repeat(20 - title.length);
                }

                if (salary.length < 10) {
                    salary = salary + ' '.repeat(10 - salary.length);
                }

                console.log(`${id}   ${title}${salary} ${department_id}`);
            }

            console.log("\n\n");
        }
    });

};

//line to inner join all tables: 
//SELECT * FROM departments INNER JOIN roles ON departments.id = roles.department_id INNER JOIN employees ON roles.id = employees.role_id

//line to inner join roles and departments:
// SELECT * FROM departments INNER JOIN roles ON departments.id = roles.department_id;

async function displayEmployees() {
    db.query("SELECT * FROM employees", (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log("\n\n");

            console.log(chalk.blue.bold.underline(`ID  First Name     Last Name     Department     Salary     Manager`));

            for (let i = 0; i < results.length; i++) {
                let { id, first_name, last_name, role_id, manager_id } = results[i];

                let salary;

                db.query(`SELECT * FROM roles WHERE id = ${role_id}`, (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        salary = results[0].salary;
                        let department_id = results[0].department_id;

                        const department = await returnDepartment(department_id);
                        const manager = await returnManager(manager_id);

                        //formatting all results for the table
                        if (first_name.length < 10) {
                            first_name = first_name + ' '.repeat(10 - first_name.length);
                        };

                        if (last_name.length < 10) {
                            last_name = last_name + ' '.repeat(10 - last_name.length);
                        };

                        if (salary.length < 10) {
                            salary = salary + ' '.repeat(10 - salary.length);
                        };

                        if (role_id.length < 10) {
                            role_id = role_id + ' '.repeat(10 - role_id.length);
                        };

                        // if (manager && manager.length<25) {
                        //     manager = manager + ' '.repeat(25-manager.length);
                        // }                                                                      

                        console.log(`${id}   ${first_name}${last_name}${department}${salary}${manager}`);
                    }
                })

            }

            console.log("\n\n");
        }
    });
}

async function returnDepartment(department_id) {
    try {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM departments WHERE id = ${department_id}`, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    console.table(results);
                    const { name } = results[0];

                    resolve(`${name}`);
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
}

async function returnManager(manager_id) {
    try {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM employees WHERE id = ${manager_id}`, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    console.table(results);
                    const { first_name, last_name } = results[0];

                    resolve(`${first_name} ${last_name}`);
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
}


//initial menu population
// displayMenu();

async function exampleUsage() {
    const departmentName = await returnDepartment(1);
    console.log(departmentName); // Use the managerName string here
}

exampleUsage();
