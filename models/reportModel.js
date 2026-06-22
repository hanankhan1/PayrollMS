const db = require("../config/db");

// Payroll Summary

exports.payrollSummary = (callback) => {

    const sql = `
    SELECT
        p.payroll_id,
        e.full_name,
        p.payroll_month,
        p.payroll_year,
        p.gross_salary,
        p.net_salary
    FROM payroll p
    JOIN employees e
    ON p.employee_id=e.employee_id
    ORDER BY p.payroll_year DESC,
             p.payroll_month DESC
    `;

    db.query(sql, callback);
};

// Department Salary Report

exports.departmentSalary = (callback) => {

    const sql = `
    SELECT
        d.department_name,

        COUNT(e.employee_id)
        AS total_employees,

        SUM(p.net_salary)
        AS total_salary_paid

    FROM departments d

    LEFT JOIN employees e
    ON d.department_id=e.department_id

    LEFT JOIN payroll p
    ON e.employee_id=p.employee_id

    GROUP BY d.department_id
    `;

    db.query(sql, callback);
};

// Employee Payroll History

exports.employeeHistory = (
    employeeId,
    callback
) => {

    const sql = `
    SELECT
        p.*,
        e.full_name
    FROM payroll p
    JOIN employees e
    ON p.employee_id=e.employee_id
    WHERE p.employee_id=?
    ORDER BY payroll_year DESC,
             payroll_month DESC
    `;

    db.query(
        sql,
        [employeeId],
        callback
    );
};

// Attendance Report

exports.attendanceReport = (
    callback
) => {

    const sql = `
    SELECT

        e.full_name,

        SUM(
            CASE
            WHEN attendance_status='Present'
            THEN 1
            ELSE 0
            END
        ) AS present_days,

        SUM(
            CASE
            WHEN attendance_status='Absent'
            THEN 1
            ELSE 0
            END
        ) AS absent_days,

        SUM(
            CASE
            WHEN attendance_status='On Leave'
            THEN 1
            ELSE 0
            END
        ) AS leave_days

    FROM employees e

    LEFT JOIN attendance a
    ON e.employee_id=a.employee_id

    GROUP BY e.employee_id
    `;

    db.query(sql, callback);
};