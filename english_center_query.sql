create database winterdatabase;

use winterdatabase;

CREATE TABLE IF NOT EXISTS Admin (
    id CHAR(50) PRIMARY KEY,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Teacher (
    id CHAR(50) PRIMARY KEY,
    gender VARCHAR(10) NOT NULL,
    -- picture Text
    mobile_phone varchar(10),
    monthly_salary DECIMAL(10,2),
    home_address varchar(50),
    account_status BOOLEAN DEFAULT 1,
    full_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    email VARCHAR(50) UNIQUE,
    employee_role VARCHAR(50),
    user_name VARCHAR(50) UNIQUE NOT NULL, 
    password VARCHAR(100) NOT NULL
);


CREATE TABLE IF NOT EXISTS Class (
    id CHAR(50) PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    teacher_id CHAR(50),
    monthly_tuition_fee DECIMAL(10,2),
    expected_lessons INT,
    FOREIGN KEY (teacher_id) REFERENCES Teacher(id)
);

CREATE TABLE IF NOT EXISTS Student (
    id CHAR(50) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
	user_name VARCHAR(100) UNIQUE NOT NULL,
	password varchar(255) NOT NULL,
    class_id CHAR(50),
    FOREIGN KEY (class_id) REFERENCES Class(id)
);

CREATE TABLE IF NOT EXISTS Parent (
    id CHAR(50) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    user_name VARCHAR(100) UNIQUE NOT NULL,
    student_id CHAR(50),
    phone VARCHAR(20),
    FOREIGN KEY (student_id) REFERENCES Student(id)
);


CREATE TABLE IF NOT EXISTS Enrollment (
    id CHAR(50) PRIMARY KEY,
    student_id CHAR(50),
    class_id CHAR(50),
    enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES Student(id),
    FOREIGN KEY (class_id) REFERENCES Class(id)
);

CREATE TABLE IF NOT EXISTS Attendance (
    id CHAR(50) PRIMARY KEY,
    enrollment_id CHAR(50),
    attendance_date DATE,
    is_present BOOLEAN DEFAULT 1,
    FOREIGN KEY (enrollment_id) REFERENCES Enrollment(id)
);

CREATE TABLE IF NOT EXISTS Payment (
    id CHAR(50) PRIMARY KEY,
    enrollment_id CHAR(50),
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE,
    FOREIGN KEY (enrollment_id) REFERENCES Enrollment(id)
);

create table if not exists Announcement(
    id char(50) PRIMARY key,
    course_name varchar(50) not null,
    day_of_the_week varchar(50) not null,
    start_time varchar(50) not null,
    end_time varchar(50) not null, 
    start_date varchar(50) not null
);


-- INSERT DATA
-- Inserting data into Admin
INSERT INTO Admin (id, user_name, password) VALUES 
('admin1', 'adminuser1', '$2b$10$.XODso0FsQuv5bwlQecYcuaUioMZSwn8D1K.S07M4cyBjiTDieJgy'),
('admin2', 'adminuser2', '$2b$10$.XODso0FsQuv5bwlQecYcuaUioMZSwn8D1K.S07M4cyBjiTDieJgy');

-- Inserting data into Teacher
INSERT INTO Teacher (id, gender, mobile_phone, monthly_salary, home_address, account_status, full_name, date_of_birth, email, employee_role, user_name, password) VALUES
('T001', 'Male', '1234567890', 4500.00, '123 Elm St', TRUE, 'John Doe', '1985-06-15', 'john.doe@example.com', 'Mathematics Teacher', 'johndoe', '$2b$10$.XODso0FsQuv5bwlQecYcuaUioMZSwn8D1K.S07M4cyBjiTDieJgy'),
('T002', 'Female', '0987654321', 4700.00, '456 Maple Ave', TRUE, 'Jane Smith', '1990-04-22', 'jane.smith@example.com', 'Science Teacher', 'janesmith', '$2b$10$.XODso0FsQuv5bwlQecYcuaUioMZSwn8D1K.S07M4cyBjiTDieJgy'),
('T003', 'Male', '1112223333', 5000.00, '789 Oak Blvd', TRUE, 'Mike Johnson', '1982-11-30', 'mike.johnson@example.com', 'History Teacher', 'mikejohnson', '$2b$10$.XODso0FsQuv5bwlQecYcuaUioMZSwn8D1K.S07M4cyBjiTDieJgy'),
('T004', 'Female', '4445556666', 4800.00, '101 Pine Ln', TRUE, 'Emily Davis', '1978-02-14', 'emily.davis@example.com', 'English Teacher', 'emilydavis', '$2b$10$.XODso0FsQuv5bwlQecYcuaUioMZSwn8D1K.S07M4cyBjiTDieJgy'),
('T005', 'Male', '7778889999', 4600.00, '202 Birch Rd', TRUE, 'Robert Brown', '1988-08-08', 'robert.brown@example.com', 'Physical Education Teacher', 'robertbrown', '$2b$10$.XODso0FsQuv5bwlQecYcuaUioMZSwn8D1K.S07M4cyBjiTDieJgy');


-- Inserting data into Class
INSERT INTO Class (id, class_name, year, teacher_id, monthly_tuition_fee, expected_lessons) VALUES
('C001', 'Mathematics 101', 2023, 'T001', 300.00, 20),
('C002', 'Biology 201', 2023, 'T002', 320.00, 18),
('C003', 'History 101', 2023, 'T003', 280.00, 22),
('C004', 'English Literature 101', 2023, 'T004', 290.00, 21),
('C005', 'Physical Education 101', 2023, 'T005', 260.00, 24);


-- Inserting data into Student
INSERT INTO Student (id, full_name, user_name, password, class_id) VALUES 
('student1', 'Alice Johnson', 'alicej', '$2b$10$.XODso0FsQuv5bwlQecYcuaUioMZSwn8D1K.S07M4cyBjiTDieJgy', 'class1'),
('student2', 'Bob Brown', 'bobb', '$2b$10$.XODso0FsQuv5bwlQecYcuaUioMZSwn8D1K.S07M4cyBjiTDieJgy', 'class2');

-- Inserting data into Parent
INSERT INTO Parent (id, full_name, email, user_name, student_id, phone) VALUES 
('parent1', 'Mr. Johnson', 'johnson@example.com', 'mrjohnson', 'student1', '1112223333'),
('parent2', 'Mrs. Brown', 'brown@example.com', 'mrsbrown', 'student2', '4445556666');

-- Inserting data into Enrollment
INSERT INTO Enrollment (id, student_id, class_id) VALUES 
('enrollment1', 'student1', 'class1'),
('enrollment2', 'student2', 'class2');

-- Inserting data into Attendance
INSERT INTO Attendance (id, enrollment_id, attendance_date, is_present) VALUES 
('attendance1', 'enrollment1', '2024-01-01', 1),
('attendance2', 'enrollment2', '2024-01-01', 0);

-- Inserting data into Payment
INSERT INTO Payment (id, enrollment_id, amount, payment_date) VALUES 
('payment1', 'enrollment1', 100.00, '2024-01-02'),
('payment2', 'enrollment2', 150.00, '2024-01-03');




-- QUERY DATA

-- Select data from Admin table
SELECT * FROM Admin;

-- Select data from Teacher table
SELECT * FROM Teacher;

-- Select data from Parent table
SELECT * FROM Parent;

-- Select data from Class table
SELECT * FROM Class;

-- Select data from Student table
SELECT * FROM Student;

-- Select data from Enrollment table
SELECT * FROM Enrollment;

-- Select data from Attendance table
SELECT * FROM Attendance;

-- Select data from Payment table
SELECT * FROM Payment;




select * from Admin;
SELECT `admin_id`, `username`, `password` FROM `Admin` AS `Admin` WHERE `Admin`.`username` = 'admin1' AND `Admin`.`password` = 'admin1';

-- Retrieve the names of all classes and their respective teachers:
SELECT c.class_name, t.full_name AS teacher_name
FROM Class c
JOIN Teacher t ON c.teacher_id = t.teacher_id;

-- Retrieve the full names and usernames of all Studentstudents along with the names of their classes:
 
SELECT s.full_name AS student_name, s.user_name AS student_username, c.class_name
FROM Student s
JOIN Class c ON s.class_id = c.class_id;



SELECT s.full_name AS student_name, a.is_present
FROM Student s
JOIN Enrollment e ON s.student_id = e.student_id
JOIN Attendance a ON e.enrollment_id = a.enrollment_id
WHERE a.attendance_date = '2024-06-01';


SELECT p.full_name AS parent_name, SUM(pm.amount) AS total_payment
FROM Parent p
JOIN Student s ON p.parent_id = s.parent_id
JOIN Enrollment e ON s.student_id = e.student_id
JOIN Payment pm ON e.enrollment_id = pm.enrollment_id
GROUP BY p.full_name;


-- DELETE DATA
DROP TABLE IF EXISTS Payment;
DROP TABLE IF EXISTS Attendance;
DROP TABLE IF EXISTS Enrollment;
DROP TABLE IF EXISTS Parent;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS Class;
DROP TABLE IF EXISTS Teacher;
DROP TABLE IF EXISTS Admin;






