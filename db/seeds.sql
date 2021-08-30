INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Finance'),
    ('Marketing'),
    ('Legal'),
    ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Manager', 55000, 1),
    ('Sales Team Lead', 70000, 1),
    ('Senior Accountant', 70000, 2), 
    ('Junior Accountant', 60000, 2),
    ('Social Media Manager', 55000, 3), 
    ('Marketing Analyst', 60000, 3),
    ('Legal Counsel', 85000, 4),
    ('Lawyer', 100000, 4),
    ('Software Engineer', 90000, 5),
    ('Lead Engineer', 125000, 5); 

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Rusty', 'Hamilton', 1, 3),
    ('Chick', 'Peters', 1, 3),
    ('Herb', 'Wilkins', 2, null),
    ('Chester', 'Harrington', 3, null),
    ('Gus', 'Raymond', 4, 4),
    ('Barney', 'Culpepper', 5, null),
    ('Roger', 'Pemberton', 6, 5),
    ('John Jacob', 'Jingleheimer-Smith', 6, 5),
    ('Buster', 'Hadfield', 7, 8),
    ('Morris', 'Crutchfield', 7, 8),
    ('Shaun', 'Fleming', 8, null),
    ('Leeroy', 'Yarborough', 9, 10),
    ('Kevin', 'Sheehan', 9, 10),
    ('Wilbur', 'Romney', 10, null);