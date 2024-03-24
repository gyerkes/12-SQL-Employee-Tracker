INSERT INTO department (name)
VALUES  ("Sales"),
        ("Marketing"),
        ("Engineering"),
        ("Technical Support");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 150000, 1),
        ("Salesperson", 100000, 1),
        ("Marketing Lead", 90000, 2),
        ("Marketing", 70000, 2),
        ("Egineering Lead", 150000, 3),
        ("Egineer", 110000, 3),
        ("Technical Support Lead", 80000, 4),
        ("Technical Support", 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Greg", "Lan", 1, null),
        ("Mike", "Lamb", 2, 1),
        ("Tom", "Ashley", 3, null),
        ("Eddie", "Forest", 4, 3),
        ("Julie", "Ingram", 5, null),
        ("Mark", "Wallace", 6, 5),
        ("Michelle", "Berry", 7, null),
        ("Louis", "Ronald", 8, 7);