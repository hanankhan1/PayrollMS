const db = require("../config/db");

// Get Payroll Records

exports.getPayrolls = (callback) => {

    const sql = `
    SELECT
        p.*,
        e.full_name
    FROM payroll p
    JOIN employees e
    ON p.employee_id=e.employee_id
    ORDER BY payroll_id DESC
    `;

    db.query(sql, callback);
};

// Generate Payroll

exports.generatePayroll = (
    data,
    callback
) => {

    const sql = `
    INSERT INTO payroll
    (
        employee_id,
        payroll_month,
        payroll_year,

        basic_salary,

        total_allowances,
        total_deductions,

        absent_days,
        attendance_deduction,

        gross_salary,
        net_salary,

        payroll_date
    )
    VALUES (?,?,?,?,?,?,?,?,?,?,CURDATE())
    `;

    db.query(
        sql,
        [
            data.employee_id,
            data.payroll_month,
            data.payroll_year,

            data.basic_salary,

            data.total_allowances,
            data.total_deductions,

            data.absent_days,
            data.attendance_deduction,

            data.gross_salary,
            data.net_salary
        ],
        callback
    );
};

// Delete

exports.deletePayroll = (
    id,
    callback
) => {

    db.query(
        "DELETE FROM payroll WHERE payroll_id=?",
        [id],
        callback
    );
};