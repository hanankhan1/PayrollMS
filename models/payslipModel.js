const db = require("../config/db");

// Get All Payslips

exports.getPayslips = (callback) => {

    const sql = `
    SELECT
        ps.*,
        e.full_name,
        p.payroll_month,
        p.payroll_year
    FROM payslips ps
    JOIN payroll p
    ON ps.payroll_id = p.payroll_id
    JOIN employees e
    ON p.employee_id = e.employee_id
    ORDER BY ps.payslip_id DESC
    `;

    db.query(sql, callback);
};

// Save Payslip

exports.savePayslip = (
    payrollId,
    path,
    callback
) => {

    const sql = `
    INSERT INTO payslips
    (
        payroll_id,
        pdf_path
    )
    VALUES (?,?)
    `;

    db.query(
        sql,
        [
            payrollId,
            path
        ],
        callback
    );
};
exports.getEmployeePayslips = (
    employeeId,
    callback
) => {

    const sql = `
    SELECT
        ps.*,
        p.payroll_month,
        p.payroll_year,
        p.net_salary
    FROM payslips ps
    JOIN payroll p
    ON ps.payroll_id = p.payroll_id
    WHERE p.employee_id = ?
    ORDER BY ps.payslip_id DESC
    `;

    db.query(
        sql,
        [employeeId],
        callback
    );
};