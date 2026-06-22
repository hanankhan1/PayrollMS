CREATE DATABASE payroll_management_system;
USE payroll_management_system;
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin','HR Officer','Payroll Officer','Employee') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (username, password, role) 
VALUES ('admin', '11223344', 'Admin');
select * from users;
truncate table users;
CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255)
);
truncate table departments;
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(100) NOT NULL,
    cnic VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    department_id INT,
    designation VARCHAR(100),
    joining_date DATE,
    basic_salary DECIMAL(12,2) NOT NULL,
    bank_account_number VARCHAR(50),
    status ENUM('Active','Inactive') DEFAULT 'Active',

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);
select * from employees;
CREATE TABLE attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    check_in_time TIME,
    check_out_time TIME,
    attendance_status ENUM('Present','Absent','On Leave') NOT NULL,

    FOREIGN KEY (employee_id)
    REFERENCES employees(employee_id)
);
CREATE TABLE salary_structure (
    structure_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,

    house_allowance DECIMAL(10,2) DEFAULT 0,
    medical_allowance DECIMAL(10,2) DEFAULT 0,
    transport_allowance DECIMAL(10,2) DEFAULT 0,

    tax DECIMAL(10,2) DEFAULT 0,
    loan_deduction DECIMAL(10,2) DEFAULT 0,
    other_deduction DECIMAL(10,2) DEFAULT 0,

    FOREIGN KEY (employee_id)
    REFERENCES employees(employee_id)
);
CREATE TABLE payroll (
    payroll_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,

    payroll_month INT NOT NULL,
    payroll_year INT NOT NULL,

    basic_salary DECIMAL(12,2) NOT NULL,

    total_allowances DECIMAL(12,2) NOT NULL,
    total_deductions DECIMAL(12,2) NOT NULL,

    absent_days INT DEFAULT 0,
    attendance_deduction DECIMAL(12,2) DEFAULT 0,

    gross_salary DECIMAL(12,2) NOT NULL,
    net_salary DECIMAL(12,2) NOT NULL,

    payroll_date DATE,

    FOREIGN KEY (employee_id)
    REFERENCES employees(employee_id)
);
select * from payroll;
truncate table payroll;
CREATE TABLE payslips (
    payslip_id INT AUTO_INCREMENT PRIMARY KEY,
    payroll_id INT NOT NULL,
    pdf_path VARCHAR(255),
    generated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (payroll_id)
    REFERENCES payroll(payroll_id)
);
truncate table payslips;
SET FOREIGN_KEY_CHECKS = 0;

-- Truncate tables in child‑first order
TRUNCATE TABLE payslips;          -- depends on payroll
TRUNCATE TABLE payroll;           -- depends on employees
TRUNCATE TABLE attendance;        -- depends on employees
TRUNCATE TABLE salary_structure;  -- depends on employees
TRUNCATE TABLE employees;         -- depends on departments & users
TRUNCATE TABLE departments;       -- independent
TRUNCATE TABLE users;             -- independent

-- Re‑enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
INSERT INTO users (user_id, username, password, role) VALUES
(3, 'payroll_officer', 'pay123', 'Payroll Officer'),
(4, 'john_doe',     'emp123',  'Employee'),
(5, 'jane_smith',   'emp123',  'Employee'),
(6, 'bob_johnson',  'emp123',  'Employee'),
(7, 'alice_williams','emp123',  'Employee');

-- --------------------------------------------
-- 2. Departments
-- --------------------------------------------
INSERT INTO departments (department_id, department_name, description) VALUES
(2, 'IT',        'Information Technology'),
(3, 'Finance',   'Financial Management'),
(4, 'Admin',     'Administration');

-- --------------------------------------------
-- 3. Employees
-- --------------------------------------------
INSERT INTO employees (
    employee_id, user_id, full_name, cnic, email, phone, department_id,
    designation, joining_date, basic_salary, bank_account_number, status
) VALUES
(2, 4, 'John Doe',      '12345-6789012-3', 'john.doe@company.com', '0300-1111111', 1,
 'Software Engineer', '2024-01-15', 75000.00, 'PK01BANK0001', 'Active'),
(3, 5, 'Jane Smith',    '12345-6789012-4', 'jane.smith@company.com', '0300-2222222', 2,
 'HR Manager',        '2023-06-01', 80000.00, 'PK01BANK0002', 'Active'),
(4, 6, 'Bob Johnson',   '12345-6789012-5', 'bob.johnson@company.com', '0300-3333333', 3,
 'Accountant',         '2024-03-10', 65000.00, 'PK01BANK0003', 'Active'),
(5, 7, 'Alice Williams','12345-6789012-6', 'alice.w@company.com', '0300-4444444', 4,
 'Admin Officer',      '2023-09-20', 60000.00, 'PK01BANK0004', 'Active');

-- --------------------------------------------
-- 4. Salary Structure (allowances & deductions per employee)
-- --------------------------------------------
INSERT INTO salary_structure (
    structure_id, employee_id,
    house_allowance, medical_allowance, transport_allowance,
    tax, loan_deduction, other_deduction
) VALUES
(1, 1, 15000.00, 5000.00, 3000.00, 5000.00, 0.00, 1000.00),
(2, 2, 16000.00, 6000.00, 4000.00, 6000.00, 2000.00, 0.00),
(3, 3, 12000.00, 4000.00, 2000.00, 4000.00, 0.00, 0.00),
(4, 4, 10000.00, 3000.00, 2000.00, 3000.00, 0.00, 0.00);

-- --------------------------------------------
-- 5. Attendance (January 2026 – sample days)
-- --------------------------------------------
-- Employee 1: absent on 5th & 8th; present other days
INSERT INTO attendance (attendance_id, employee_id, attendance_date, check_in_time, check_out_time, attendance_status) VALUES
(1,  1, '2026-01-01', '09:00:00', '17:00:00', 'Present'),
(2,  1, '2026-01-02', '09:05:00', '17:10:00', 'Present'),
(3,  1, '2026-01-03', '08:55:00', '17:05:00', 'Present'),
(4,  1, '2026-01-04', '09:10:00', '17:20:00', 'Present'),
(5,  1, '2026-01-05', NULL,       NULL,       'Absent'),
(6,  1, '2026-01-06', '09:00:00', '17:00:00', 'Present'),
(7,  1, '2026-01-07', '09:00:00', '17:00:00', 'Present'),
(8,  1, '2026-01-08', NULL,       NULL,       'Absent'),
(9,  1, '2026-01-09', '09:00:00', '17:00:00', 'Present'),
(10, 1, '2026-01-10', '09:00:00', '17:00:00', 'Present');

-- Employee 2: all present
INSERT INTO attendance (attendance_id, employee_id, attendance_date, check_in_time, check_out_time, attendance_status) VALUES
(11, 2, '2026-01-01', '08:50:00', '17:10:00', 'Present'),
(12, 2, '2026-01-02', '08:55:00', '17:00:00', 'Present'),
(13, 2, '2026-01-03', '09:00:00', '17:05:00', 'Present'),
(14, 2, '2026-01-04', '08:45:00', '17:00:00', 'Present'),
(15, 2, '2026-01-05', '09:00:00', '17:00:00', 'Present'),
(16, 2, '2026-01-06', '09:10:00', '17:15:00', 'Present'),
(17, 2, '2026-01-07', '08:55:00', '17:00:00', 'Present'),
(18, 2, '2026-01-08', '09:00:00', '17:00:00', 'Present'),
(19, 2, '2026-01-09', '09:00:00', '17:00:00', 'Present'),
(20, 2, '2026-01-10', '09:00:00', '17:00:00', 'Present');

-- Employee 3: absent on 5th
INSERT INTO attendance (attendance_id, employee_id, attendance_date, check_in_time, check_out_time, attendance_status) VALUES
(21, 3, '2026-01-01', '09:00:00', '17:00:00', 'Present'),
(22, 3, '2026-01-02', '09:05:00', '17:10:00', 'Present'),
(23, 3, '2026-01-03', '08:55:00', '17:05:00', 'Present'),
(24, 3, '2026-01-04', '09:10:00', '17:20:00', 'Present'),
(25, 3, '2026-01-05', NULL,       NULL,       'Absent'),
(26, 3, '2026-01-06', '09:00:00', '17:00:00', 'Present'),
(27, 3, '2026-01-07', '09:00:00', '17:00:00', 'Present'),
(28, 3, '2026-01-08', '09:00:00', '17:00:00', 'Present'),
(29, 3, '2026-01-09', '09:00:00', '17:00:00', 'Present'),
(30, 3, '2026-01-10', '09:00:00', '17:00:00', 'Present');

-- Employee 4: all present
INSERT INTO attendance (attendance_id, employee_id, attendance_date, check_in_time, check_out_time, attendance_status) VALUES
(31, 4, '2026-01-01', '09:00:00', '17:00:00', 'Present'),
(32, 4, '2026-01-02', '09:00:00', '17:00:00', 'Present'),
(33, 4, '2026-01-03', '09:00:00', '17:00:00', 'Present'),
(34, 4, '2026-01-04', '09:00:00', '17:00:00', 'Present'),
(35, 4, '2026-01-05', '09:00:00', '17:00:00', 'Present'),
(36, 4, '2026-01-06', '09:00:00', '17:00:00', 'Present'),
(37, 4, '2026-01-07', '09:00:00', '17:00:00', 'Present'),
(38, 4, '2026-01-08', '09:00:00', '17:00:00', 'Present'),
(39, 4, '2026-01-09', '09:00:00', '17:00:00', 'Present'),
(40, 4, '2026-01-10', '09:00:00', '17:00:00', 'Present');

-- --------------------------------------------
-- 6. Payroll (January 2026)
-- --------------------------------------------
-- Computations (basic, allowances, deductions, absent_days, attendance_deduction, gross, net)
-- Employee 1: basic 75000, allowances 23000, deductions 6000, absent 2, per day 3409.09, deduction 6818.18
-- Employee 2: basic 80000, allowances 26000, deductions 8000, absent 0
-- Employee 3: basic 65000, allowances 18000, deductions 4000, absent 1, per day 2954.55
-- Employee 4: basic 60000, allowances 15000, deductions 3000, absent 0
INSERT INTO payroll (
    payroll_id, employee_id, payroll_month, payroll_year,
    basic_salary, total_allowances, total_deductions,
    absent_days, attendance_deduction,
    gross_salary, net_salary, payroll_date
) VALUES
(1, 1, 1, 2026, 75000.00, 23000.00, 6000.00, 2,  6818.18, 98000.00, 85181.82, '2026-01-31'),
(2, 2, 1, 2026, 80000.00, 26000.00, 8000.00, 0,     0.00, 106000.00, 98000.00, '2026-01-31'),
(3, 3, 1, 2026, 65000.00, 18000.00, 4000.00, 1,  2954.55, 83000.00, 76045.45, '2026-01-31'),
(4, 4, 1, 2026, 60000.00, 15000.00, 3000.00, 0,     0.00, 75000.00, 72000.00, '2026-01-31');

-- --------------------------------------------
-- 7. Payslips
-- --------------------------------------------
INSERT INTO payslips (payslip_id, payroll_id, pdf_path, generated_date) VALUES
(1, 1, '/payslips/2026/01/employee_1_Jan2026.pdf', CURRENT_TIMESTAMP),
(2, 2, '/payslips/2026/01/employee_2_Jan2026.pdf', CURRENT_TIMESTAMP),
(3, 3, '/payslips/2026/01/employee_3_Jan2026.pdf', CURRENT_TIMESTAMP),
(4, 4, '/payslips/2026/01/employee_4_Jan2026.pdf', CURRENT_TIMESTAMP);