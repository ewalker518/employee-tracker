INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Finance'),
    ('Marketing'),
    ('Legal'),
    ('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Sales Manager'),  -- 1, 1
    ('Sales Team Lead'),  -- 2, 1
    ('Senior Accountant'),  -- 3, 2
    ('Junior Accountant'),  -- 4, 2
    ('Social Media Manager'),  -- 5, 3
    ('Marketing Analyst'),  -- 6, 3
    ('Legal Counsel'),  -- 7, 4
    ('Lawyer'),  -- 8, 4
    ('Software Engineer'),  -- 9, 5
    ('Lead Engineer'),  -- 10, 5
    ('Intern');  -- 11, any

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
    ('Virgil', 'Quinn', 9, 5),
    ('Kevin', 'Sheehan', 9, 5),
    ('Wilbur', 'Romney', 10, 5),
    ('Leeroy', 'Yarborough', 11, 1),
    ('Dave', 'Pearson', 11, 2),
    ('Buddy', 'Baker', 11, 3),
    ('Earl', 'Brooks', 11, 5);