INSERT INTO departments (id, name)
VALUES  (001, "Sales"),
        (002, "Engineering"),
        (003, "Finance"),
        (004, "Legal");

INSERT INTO roles (id, title, salary, department_id)
VALUES  (1, "Sales Lead", 100000, 001),
        (2, "Salesperson", 80000, 001),
        (3, "Lead Engineer", 150000,002),
        (4, "Software Engineer", 120000, 002),
        (5, "Account Manager", 160000, 003),
        (6, "Accountant", 125000, 003),
        (7, "Legal Team Lead", 250000, 004),
        (8, "Lawyer", 190000, 004);
    
INSERT INTO employees
VALUES  (1, "Alejandra", "Bernabel", 4, 2),
        (2, "Christian", "Bernabel", 3, NULL),
        (3, "Esdras", "Camacho", 8, 4),
        (4, "Michael", "Ross", 7, NULL),
        (5, "Nicole", "Mcyntosh", 5, NULL),
        (6, "Izzy", "Gomez", 6, 5),
        (7, "Tommy", "Bahama", 1, NULL),
        (8, "Arnol", "Reyes", 2, 7);