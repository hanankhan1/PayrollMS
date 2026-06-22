const db = require("../config/db");

exports.getAdminStats = (callback) => {

    const sql = `
    SELECT
    (SELECT COUNT(*) FROM employees) AS employees,
    (SELECT COUNT(*) FROM departments) AS departments,
    (SELECT COUNT(*) FROM payroll) AS payroll,
    (SELECT COUNT(*) FROM payslips) AS payslips
    `;

    db.query(sql, callback);
};

exports.getHRStats = (callback) => {

    const sql = `
    SELECT

    (SELECT COUNT(*) FROM employees) AS employees,

    (SELECT COUNT(*)
     FROM attendance
     WHERE attendance_date = CURDATE()
     AND attendance_status='Present') AS presentToday,

    (SELECT COUNT(*)
     FROM attendance
     WHERE attendance_date = CURDATE()
     AND attendance_status='Absent') AS absentToday,

    (SELECT COUNT(*)
     FROM attendance
     WHERE attendance_date = CURDATE()
     AND attendance_status='On Leave') AS leavesToday
    `;

    db.query(sql, callback);
};

exports.getPayrollStats = (callback) => {

    const sql = `
    SELECT

    (SELECT COUNT(*) FROM payroll) AS payrollProcessed,

    (SELECT COUNT(*) FROM employees)
    -
    (SELECT COUNT(DISTINCT employee_id)
    FROM payroll
    WHERE payroll_month = MONTH(CURDATE())
    AND payroll_year = YEAR(CURDATE()))
    AS pendingPayroll,

    (SELECT COUNT(*) FROM payslips) AS payslips,

    (SELECT IFNULL(SUM(net_salary),0)
    FROM payroll
    WHERE payroll_month = MONTH(CURDATE())
    AND payroll_year = YEAR(CURDATE()))
    AS salaryExpense
    `;

    db.query(sql, callback);
};

exports.getEmployeeStats = (employeeId, callback) => {

    const sql = `
    SELECT

    (SELECT COUNT(*)
     FROM attendance
     WHERE employee_id=?
     AND attendance_status='Present')
     AS attendance,

    (SELECT IFNULL(MAX(net_salary),0)
     FROM payroll
     WHERE employee_id=?)
     AS salary,

    (SELECT COUNT(*)
     FROM payslips ps
     JOIN payroll p
     ON ps.payroll_id=p.payroll_id
     WHERE p.employee_id=?)
     AS payslips,

    (SELECT COUNT(*)
     FROM attendance
     WHERE employee_id=?)
     AS workingDays
    `;

    db.query(
        sql,
        [
            employeeId,
            employeeId,
            employeeId,
            employeeId
        ],
        callback
    );
};