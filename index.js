const inquirer = require("inquirer");

// while loop for repeating menu?

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
    switch (choice) {
        case "View all departments":
            console.log("All depatments will be displayed");
            break;

        case "View all roles":
            console.log("All roles will be displayed");
            break;

        case "View all employees":
            console.log("All employees will be displayed");
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
}

//initial menu population
displayMenu();