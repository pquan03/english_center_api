create database winterdatabase;

use winterdatabase;

CREATE TABLE IF NOT EXISTS Admin (
    id CHAR(50) PRIMARY KEY,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

create table if not exists account(
    id char(50) primary key,
    user_name varchar(50) unique not null,
    password varchar(255) not null,
    user_type varchar(50) not null
);

CREATE TABLE IF NOT EXISTS Teacher (
    id CHAR(50) PRIMARY KEY,
    gender VARCHAR(10) NOT NULL,
    mobile_phone varchar(10),
    monthly_salary float(10,2),
    home_address varchar(50),
    account_status BOOLEAN DEFAULT 1,
    full_name VARCHAR(50) NOT NULL,
    date_of_birth DATE,
    email VARCHAR(50) UNIQUE,
    employee_role VARCHAR(50),
    account_id char(50),
    foreign key (account_id) references account(id)
);

create table if not exists teacher_paid(
    id char(50) primary key,
    teacher_id char(50),
    paid_date date,
    amount float(10,2),
    foreign key (teacher_id) references Teacher(id)
);


CREATE TABLE IF NOT EXISTS Class (
    id CHAR(50) PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    teacher_id CHAR(50),
    monthly_tuition_fee float(10,2),
    time VARCHAR(50),
    expected_lessons INT,
    FOREIGN KEY (teacher_id) REFERENCES Teacher(id)
);

create table if not exists class_completed_lesson(
    id char(50) primary key,
    class_id char(50),
    lesson_number int,
    foreign key (class_id) references Class(id)
);

CREATE TABLE IF NOT EXISTS Student (
    id CHAR(50) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    gender VARCHAR(10),
    class_id CHAR(50),
    date_of_birth DATETIME,
    date_joined DATETIME,
    account_id char(50),
    foreign key (account_id) references account(id),
    FOREIGN KEY (class_id) REFERENCES Class(id)
);

CREATE TABLE IF NOT EXISTS Parent (
    id CHAR(50) PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    gender VARCHAR(10),
    student_id CHAR(50),
    account_id char(50),
    foreign key (account_id) references account(id),
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
    amount float(10,2) NOT NULL,
    percentage_discount int,
    FOREIGN KEY (enrollment_id) REFERENCES Enrollment(id)
);

create table if not exists payment_history(
    id char(50) primary key,
    payment_date date,
    amount float(10,2),
    payment_id char(50),
    parent_id char(50),
    foreign key (parent_id) references Parent(id),
    foreign key (payment_id) references Payment(id)
);

create table if not exists Announcement(
    id char(50) PRIMARY key,
    course_name varchar(50) not null,
    day_of_the_week varchar(50) not null,
    start_time varchar(50) not null,
    end_time varchar(50) not null, 
    start_date varchar(50) not null
);







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
-- Select data from teacher paid table
SELECT * FROM teacher_paid;
-- Select data from class_completed_lesson table
SELECT * FROM class_completed_lesson;
-- Select data from payment_history table   
SELECT * FROM payment_history;



-- DELETE DATA
drop table if exists payment_history;
DROP TABLE IF EXISTS Payment;
DROP TABLE IF EXISTS Attendance;
DROP TABLE IF EXISTS Enrollment;
DROP TABLE IF EXISTS Parent;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS class_completed_lesson;
DROP TABLE IF EXISTS Class;
DROP TABLE IF EXISTS teacher_paid;
DROP TABLE IF EXISTS Teacher;
drop table if exists account;
DROP TABLE IF EXISTS Admin;






-- Insert data into Admin table
INSERT INTO Admin (id, user_name, password) VALUES 
('A001', 'admin1', 'password1');


INSERT INTO account (id, user_name, password, user_type)
VALUES
    ('acc1', 'user1', 'pass1', 'admin'),
    ('acc2', 'user2', 'pass2', 'teacher'),
    ('acc3', 'user3', 'pass3', 'teacher'),
    ('acc4', 'user4', 'pass4', 'teacher'),
    ('acc5', 'user5', 'pass5', 'teacher'),
    ('acc6', 'user6', 'pass6', 'teacher'),
    ('acc7', 'user7', 'pass7', 'student'),
    ('acc8', 'user8', 'pass8', 'student'),
    ('acc9', 'user9', 'pass9', 'student'),
    ('acc10', 'user10', 'pass10', 'student'), 
    ('acc11', 'user11', 'pass11', 'student'),
    ('acc12', 'user12', 'pass12', 'student'),
    ('acc13', 'user13', 'pass13', 'student'),
    ('acc14', 'user14', 'pass14', 'student'),
    ('acc15', 'user15', 'pass15', 'student'),
    ('acc16', 'user16', 'pass16', 'student'),
    ('acc17', 'user17', 'pass17', 'parent'),
    ('acc18', 'user18', 'pass18', 'parent'),
    ('acc19', 'user19', 'pass19', 'parent'),
    ('acc20', 'user20', 'pass20', 'parent'),
    ('acc21', 'user21', 'pass21', 'parent'),
    ('acc22', 'user22', 'pass22', 'parent'),
    ('acc23', 'user23', 'pass23', 'parent'),
    ('acc24', 'user24', 'pass24', 'parent'),
    ('acc25', 'user25', 'pass25', 'parent'),
    ('acc26', 'user26', 'pass26', 'parent');


INSERT INTO Teacher (id, gender, mobile_phone, monthly_salary, home_address, account_status, full_name, date_of_birth, email, employee_role, account_id)
VALUES
    ('tch1', 'Male', '0987654321', 15000000, '123 Nguyen Van A, Hanoi', true, 'Nguyen Van A', '1980-05-10', 'tch1@example.com', 'Math Teacher', 'acc2'),
    ('tch2', 'Female', '0981234567', 13000000, '456 Le Van B, Hanoi', true, 'Le Thi B', '1985-08-15', 'tch2@example.com', 'Science Teacher', 'acc3'),
    ('tch3', 'Male', '0977123456', 14000000, '789 Tran Quoc C, Hanoi', true, 'Tran Van C', '1982-12-20', 'tch3@example.com', 'Physics Teacher', 'acc4'),
    ('tch4', 'Female', '0968234567', 12000000, '234 Pham Thi D, Hanoi', true, 'Pham Thi D', '1987-04-25', 'tch4@example.com', 'English Teacher', 'acc5'),
    ('tch5', 'Male', '0988654321', 16000000, '567 Hoang Quoc E, Hanoi', true, 'Hoang Van E', '1978-09-30', 'tch5@example.com', 'History Teacher', 'acc6');


INSERT INTO teacher_paid (id, teacher_id, paid_date, amount)
VALUES
    ('tp1', 'tch1', '2024-01-05', 1500000),
    ('tp2', 'tch2', '2024-02-10', 1300000),
    ('tp3', 'tch3', '2024-03-15', 1400000),
    ('tp4', 'tch4', '2024-01-20', 1200000),
    ('tp5', 'tch5', '2024-02-25', 1600000),
    ('tp6', 'tch1', '2024-03-05', 1500000),
    ('tp7', 'tch2', '2024-01-10', 1300000),
    ('tp8', 'tch3', '2024-02-15', 1400000),
    ('tp9', 'tch4', '2024-03-20', 1200000),
    ('tp10', 'tch5', '2024-04-25', 1600000);


INSERT INTO Class (id, class_name, year, teacher_id, monthly_tuition_fee, time, expected_lessons)
VALUES
    ('cls1', 'Mathematics', 2024, 'tch1', 2000000, 'Morning', 16),
    ('cls2', 'Science', 2024, 'tch2', 1800000, 'Afternoon', 14),
    ('cls3', 'Physics', 2024, 'tch3', 1900000, 'Evening', 15),
    ('cls4', 'English', 2024, 'tch4', 1700000, 'Morning', 12),
    ('cls5', 'History', 2024, 'tch5', 2100000, 'Afternoon', 18),
    ('cls6', 'Biology', 2024, 'tch1', 2200000, 'Evening', 20),
    ('cls7', 'Chemistry', 2024, 'tch2', 2300000, 'Morning', 22),
    ('cls8', 'Geography', 2024, 'tch3', 2400000, 'Afternoon', 24),
    ('cls9', 'Literature', 2024, 'tch4', 2500000, 'Evening', 26),
    ('cls10', 'Music', 2024, 'tch5', 2600000, 'Morning', 28);


INSERT INTO class_completed_lesson (id, class_id, lesson_number)
VALUES
    ('ccl1', 'cls1', 12),
    ('ccl2', 'cls2', 10),
    ('ccl3', 'cls3', 11),
    ('ccl4', 'cls4', 9),
    ('ccl5', 'cls5', 14),
    ('ccl6', 'cls6', 16),
    ('ccl7', 'cls7', 18),
    ('ccl8', 'cls8', 20),
    ('ccl9', 'cls9', 22),
    ('ccl10', 'cls10', 24);


INSERT INTO Student (id, full_name, phone, email, gender, class_id, date_of_birth, date_joined, account_id)
VALUES
    ('std1', 'Nguyen Van An', '0987654321', 'std1@example.com', 'Male', 'cls1', '2008-03-15', '2024-01-01', 'acc7'),
    ('std2', 'Le Thi Bao', '0981234567', 'std2@example.com', 'Female', 'cls2', '2009-06-20', '2024-02-02', 'acc8'),
    ('std3', 'Tran Van Cuong', '0977123456', 'std3@example.com', 'Male', 'cls3', '2007-09-25', '2024-02-03', 'acc9'),
    ('std4', 'Pham Thi Dung', '0968234567', 'std4@example.com', 'Female', 'cls4', '2010-12-30', '2024-02-04', 'acc10'),
    ('std5', 'Hoang Van Tuan', '0988654321', 'std5@example.com', 'Male', 'cls5', '2006-05-05', '2024-03-05', 'acc11'),
    ('std6', 'Nguyen Thi Lan', '0987654321', 'std6@example.com', 'Female', 'cls6', '2007-08-10', '2024-03-06', 'acc12'),
    ('std7', 'Le Van Khanh', '0981234567', 'std7@example.com', 'Male', 'cls7', '2009-11-15', '2024-04-07', 'acc13'),
    ('std8', 'Tran Thi Mai', '0977123456', 'std8@example.com', 'Female', 'cls8', '2008-02-20', '2024-05-08', 'acc14'),
    ('std9', 'Pham Van Hoa', '0968234567', 'std9@example.com', 'Male', 'cls9', '2011-04-25', '2024-06-09', 'acc15'),
    ('std10', 'Hoang Thi Thu', '0988654321', 'std10@example.com', 'Female', 'cls10', '2006-07-30', '2024-06-10', 'acc16');

INSERT INTO Parent (id, full_name, email, phone, gender, student_id, account_id)
VALUES
    ('par1', 'Nguyen Van Anh', 'par1@example.com', '0987654321', 'Male', 'std1', 'acc17'),
    ('par2', 'Le Thi Lan', 'par2@example.com', '0981234567', 'Female', 'std2', 'acc18'),
    ('par3', 'Tran Van Hoang', 'par3@example.com', '0977123456', 'Male', 'std3', 'acc19'),
    ('par4', 'Pham Thi Mai', 'par4@example.com', '0968234567', 'Female', 'std4', 'acc20'),
    ('par5', 'Hoang Van Hung', 'par5@example.com', '0988654321', 'Male', 'std5', 'acc21'),
    ('par6', 'Nguyen Thi Hien', 'par6@example.com', '0987654321', 'Female', 'std6', 'acc22'),
    ('par7', 'Le Van Cuong', 'par7@example.com', '0981234567', 'Male', 'std7', 'acc23'),
    ('par8', 'Tran Thi Ha', 'par8@example.com', '0977123456', 'Female', 'std8', 'acc24'),
    ('par9', 'Pham Van Tien', 'par9@example.com', '0968234567', 'Male', 'std9', 'acc25'),
    ('par10', 'Hoang Thi Bich', 'par10@example.com', '0988654321', 'Female', 'std10', 'acc26');


INSERT INTO Enrollment (id, student_id, class_id, enrollment_date)
VALUES
    ('enr1', 'std1', 'cls1', '2024-01-01'),
    ('enr2', 'std2', 'cls2', '2024-02-02'),
    ('enr3', 'std3', 'cls3', '2024-03-03'),
    ('enr4', 'std4', 'cls4', '2024-01-04'),
    ('enr5', 'std5', 'cls5', '2024-02-05'),
    ('enr6', 'std6', 'cls6', '2024-03-06'),
    ('enr7', 'std7', 'cls7', '2024-01-07'),
    ('enr8', 'std8', 'cls8', '2024-02-08'),
    ('enr9', 'std9', 'cls9', '2024-03-09'),
    ('enr10', 'std10', 'cls10', '2024-01-10');


INSERT INTO Attendance (id, enrollment_id, attendance_date, is_present)
VALUES
    ('att1', 'enr1', '2024-01-01', true),
    ('att2', 'enr2', '2024-02-02', true),
    ('att3', 'enr3', '2024-02-03', true),
    ('att4', 'enr4', '2024-02-04', true),
    ('att5', 'enr5', '2024-03-15', true),
    ('att6', 'enr6', '2024-04-06', true),
    ('att7', 'enr7', '2024-05-07', true),
    ('att8', 'enr8', '2024-04-08', true),
    ('att9', 'enr9', '2024-01-09', true),
    ('att10', 'enr10', '2024-02-10', true);


INSERT INTO Payment (id, enrollment_id, amount, percentage_discount)
VALUES
    ('pay1', 'enr1', 2000000, 12),
    ('pay2', 'enr2', 1800000, 20),
    ('pay3', 'enr3', 1900000, 15),
    ('pay4', 'enr4', 1700000, 10),
    ('pay5', 'enr5', 2100000, 11),
    ('pay6', 'enr6', 2200000, 24),
    ('pay7', 'enr7', 2300000, 11),
    ('pay8', 'enr8', 2400000, 10),
    ('pay9', 'enr9', 2500000, 50),
    ('pay10', 'enr10', 2600000, 70);


INSERT INTO payment_history (id, payment_date, amount, payment_id, parent_id)
VALUES
    ('ph1', '2024-01-01', 2000000, 'pay1', 'par1'),
    ('ph2', '2024-02-02', 1800000, 'pay2', 'par2'),
    ('ph3', '2024-02-03', 1900000, 'pay3', 'par3'),
    ('ph4', '2024-02-04', 1700000, 'pay4', 'par4'),
    ('ph5', '2024-01-05', 2100000, 'pay5', 'par5'),
    ('ph6', '2024-03-06', 2200000, 'pay6', 'par6'),
    ('ph7', '2024-03-07', 2300000, 'pay7', 'par7'),
    ('ph8', '2024-04-08', 2400000, 'pay8', 'par8'),
    ('ph9', '2024-04-09', 2500000, 'pay9', 'par9'),
    ('ph10', '2024-05-10', 2600000, 'pay10', 'par10');
