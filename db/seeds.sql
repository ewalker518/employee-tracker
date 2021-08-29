INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Finance'),
    ('Marketing'),
    ('Legal'),
    ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Sales Manager', 55000, 1),  -- 1, 1
    ('Sales Team Lead', 70000, 1),  -- 2, 1
    ('Senior Accountant', 70000, 2),  -- 3, 2
    ('Junior Accountant', 60000, 2),  -- 4, 2
    ('Social Media Manager', 55000, 3),  -- 5, 3
    ('Marketing Analyst', 60000, 3),  -- 6, 3
    ('Legal Counsel', 85000, 4),  -- 7, 4
    ('Lawyer', 100000, 4),  -- 8, 4
    ('Software Engineer', 90000, 5),  -- 9, 5
    ('Lead Engineer', 125000, 5);  -- 10, 5

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Rusty', 'Hamilton', 1, 1),
    ('Chick', 'Peters', 1, 1),
    ('Herb', 'Wilkins', 2, 1),
    ('Chester', 'Harrington', 3, 2),
    ('Gus', 'Raymond', 4, 2),
    ('Barney', 'Culpepper', 5, 3),
    ('Roger', 'Pemberton', 6, 3),
    ('John Jacob', 'Jingleheimer-Smith', 6, 3),
    ('Buster', 'Hadfield', 7, 4),
    ('Morris', 'Crutchfield', 7, 4),
    ('Shaun', 'Fleming', 8, 4),
    ('Leeroy', 'Yarborough', 9, 5),
    ('Kevin', 'Sheehan', 9, 5),
    ('Wilbur', 'Romney', 10, 5);