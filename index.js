const inquirer = require("inquirer");
const mysql = require("mysql2");
const chalk = require("chalk");

const db = mysql.createConnection("mysql2://root:password@localhost:3306/employee_db");

// while loop for repeating menu?
let exit = 0;

// view all departments, view all roles, view all employees, 
//add a department, add a role, 
//add an employee, and update an employee role

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
            handleDepartmentCreation();
            break;

        case "Add a role":
            console.log("Department wil be added");
            break;

        case "Add an employee":
            console.log("Employee will be added");
            handleEmployeeCreation();
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

        console.log("\n")
        console.log(chalk.green.bold.underline('ID   Department Name'));
        if (err) {
            console.log(err)
        } else {
            for (let i = 0; i < results.length; i++) {
                let { id, name } = results[i];

                id = id.toString();

                if (id.length <3) {
                    id = id + ' '.repeat(3-id.length);
                }

                console.log(`${id}  ${name}`);

            }
        }
    });
};

function displayRoles() {
    db.query("SELECT * FROM roles", async (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log("\n\n");

            console.log(chalk.red.bold.underline(`ID  Title               Salary     Department`));

            for (let i = 0; i < results.length; i++) {
                let { id, title, salary, department_id } = results[i];

                let department = await returnDepartment(department_id);

                if (title.length < 20) {
                    title = title + ' '.repeat(20 - title.length);
                }

                if (salary.length < 10) {
                    salary = salary + ' '.repeat(10 - salary.length);
                }

                id = id.toString();

                if (id.length <3) {
                    id = id + ' '.repeat(3-id.length);
                }

                console.log(`${id} ${title}${salary} ${department}`);
            }

            console.log("\n\n");
        }
    });

};

//line to inner join all tables: 
//SELECT * FROM departments INNER JOIN roles ON departments.id = roles.department_id INNER JOIN employees ON roles.id = employees.role_id

//line to inner join roles and departments:
// SELECT * FROM departments INNER JOIN roles ON departments.id = roles.department_id;

function displayEmployees() {
    db.query("SELECT employees.id, first_name, last_name, title, name, salary, manager_id FROM departments INNER JOIN roles ON departments.id = roles.department_id INNER JOIN employees ON roles.id = employees.role_id ORDER BY employees.id", async (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log("\n");
            console.log(chalk.blue.bold.underline(`ID   First Name     Last Name      Title               Department     Salary     Manager`));

            for (let i = 0; i < results.length; i++) {
                let { id, first_name, last_name, title, name, salary, manager_id } = results[i];

                let department = name;

                let managerName = await returnManager(manager_id);

                id = id.toString();

                //formatting all results for the table
                if (first_name.length < 15) {
                    first_name = first_name + ' '.repeat(15 - first_name.length);
                };

                if (last_name.length < 15) {
                    last_name = last_name + ' '.repeat(15 - last_name.length);
                };

                if (salary.length < 10) {
                    salary = salary + ' '.repeat(10 - salary.length);
                };

                if (title.length < 20) {
                    title = title + ' '.repeat(20 - title.length);
                };

                if (department.length < 15) {
                    department = department + ' '.repeat(15 - department.length);
                }

                if (managerName.length < 20) {
                    managerName = managerName + ' '.repeat(20 - managerName.length);
                }

                if (id.length <3) {
                    id = id + ' '.repeat(3 - id.length);
                }

                console.log(`${id}  ${first_name}${last_name}${title}${department}${salary}${managerName}`);

            }
        }
    });
};

async function handleEmployeeCreation () {

    const roleChoices = await returnAllRoles();
    const managerChoices = await returnAllEmployeeNames();

    managerChoices.push("No manager");

    inquirer 
        .prompt ([
            {
                type: "input",
                message: "What is the employee's first name?",
                name: "first_name"
            },

            {
                type: "input",
                message: "What is the employee's last name?",
                name: "last_name"
            },

            {
                type: "list",
                message: "What is the employee's role?",
                choices: roleChoices,
                name: "roleName",
            },

            {
                type: "list",
                message: "Who is the employee's manager?",
                choices: managerChoices,
                name: "managerName",
            }

        ])

        .then(async (answers) => {
            if (!answers.first_name || !answers.last_name) {
                console.log("No name was provided. \nNew employee will not be added.")
            } else {

                if (answers.roleName == "No manager") {

                } else {
                    const roleID = await returnRoleID(answers.roleName);
                }
                const managerID = await returnEmployeeID(answers.managerName);

                addEmployee(answers.first_name, answers.last_name, roleID, managerID);
            }
        })
        .catch((error) => {
            if (error) {
                console.log(error);
            }
        });

        
}
function addEmployee(firstName, lastName, role, manager) {
    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${role}, ${manager})`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
}

function addRole(name, salary, department) {

}


function handleDepartmentCreation() {
    inquirer
        .prompt([
            {
            type: "input",
            message: "What is the name of the new department?",
            name: "departmentName"
            }
        ])
        .then((answers) => {
            if (!answers.departmentName) {
                console.log("No department name was provided. \nNew department will not be added.")
            } else {
                newDepartment(answers.departmentName);
            }
        })
        .catch((error) => {
            if (error) {
                console.log(error);
            }
        });
}

function newDepartment(departmentName) {
    db.query(`INSERT INTO departments (name) VALUE ("${departmentName}")`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log(results);
        }
    });
}

async function returnEmployeeID (employeeName) {
    let first_name = employeeName.split(' ')[0];
    let last_name = employeeName.split(' ')[1];

    try {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM employees WHERE first_name = "${first_name}" AND last_name = "${last_name}"`, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const { id } = results[0];

                    resolve(id);
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
    
}

async function returnRoleID(roleName) {
    try {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM roles WHERE title = "${roleName}"`, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const { id } = results[0];

                    resolve(id);
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
}

async function returnDepartment(department_id) {
    try {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM departments WHERE id = ${department_id}`, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    // console.table(results);
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
                } else if (manager_id == null) {
                    // console.log("there is no manager");
                    resolve('None');
                } else {
                    // console.table(results);
                    const { first_name, last_name } = results[0];

                    resolve(`${first_name} ${last_name}`);
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
}

async function returnAllDepartments () {
    try {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM departments", (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const allDepartments = [];
                    for (let i = 0; i <results.length; i++) {
                        allDepartments.push(results[i].name);
                    }
                    
                    resolve(allDepartments);
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
}

async function returnAllRoles () {
    try {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM roles", (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const allRoles = [];
                    for (let i = 0; i <results.length; i++) {
                        allRoles.push(results[i].title);
                    }
                    
                    resolve(allRoles);
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
}

async function returnAllEmployeeNames () {
    try {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM employees", (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    const allEmployees = [];
                    for (let i = 0; i <results.length; i++) {
                        allEmployees.push(results[i].first_name + " " + results[i].last_name);
                    }
                    
                    resolve(allEmployees);
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
}

// initial menu population
displayMenu();

// async function exampleUsage() {
//     const departmentName = await returnDepartment(1);
//     console.log(departmentName); // Use the managerName string here
// }

// exampleUsage();
