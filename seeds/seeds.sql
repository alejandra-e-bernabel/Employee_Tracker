INSERT INTO departments (id, name)
VALUES  (1, "Sales"),
        (2, "Engineering"),
        (3, "Finance"),
        (4, "Legal");

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
VALUES  (1, "Christian", "Bernabel", 3, NULL),
        (2, "Alejandra", "Bernabel", 4, 1),
        (3, "Michael", "Ross", 7, NULL),
        (4, "Esdras", "Camacho", 8, 3),
        (5, "Nicole", "Mcyntosh", 5, NULL),
        (6, "Izzy", "Gomez", 6, 5),
        (7, "Tommy", "Bahama", 1, NULL),
        (8, "Arnold", "Reyes", 2, 7);
