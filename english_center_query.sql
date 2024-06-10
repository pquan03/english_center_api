create database winterdatabase;

use winterdatabase;

CREATE TABLE IF NOT EXISTS Admin (
    id CHAR(50) PRIMARY KEY,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Teacher (
    id CHAR(50) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    user_name VARCHAR(100) UNIQUE NOT NULL,
    password varchar(255) not null,
    phone VARCHAR(20)
);


CREATE TABLE IF NOT EXISTS Class (
    id CHAR(50) PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    teacher_id CHAR(50),
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


-- INSERT DATA
-- Inserting data into Admin
INSERT INTO Admin (id, user_name, password) VALUES 
('admin1', 'adminuser1', 'password123'),
('admin2', 'adminuser2', 'password456');

-- Inserting data into Teacher
INSERT INTO Teacher (id, full_name, user_name, password, phone) VALUES 
('teacher1', 'John Doe', 'johndoe', 'passjohn', '1234567890'),
('teacher2', 'Jane Smith', 'janesmith', 'passjane', '0987654321');

-- Inserting data into Class
INSERT INTO Class (id, class_name, year, teacher_id) VALUES 
('class1', 'Math 101', 2024, 'teacher1'),
('class2', 'Science 101', 2024, 'teacher2'),
('class3', 'English 101', 2024, 'teacher1'),
('class4', 'History 101', 2024, 'teacher2'),
('class5', 'Art 101', 2024, 'teacher1');

-- Inserting data into Student
INSERT INTO Student (id, full_name, user_name, password, class_id) VALUES 
('student1', 'Alice Johnson', 'alicej', 'passalice', 'class1'),
('student2', 'Bob Brown', 'bobb', 'passbob', 'class2');

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






