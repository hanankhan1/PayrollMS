const db = require("../config/db");

// Get All Employees
exports.getAllEmployees = (callback) => {

    const sql = `
    SELECT
        e.*,
        d.department_name
    FROM employees e
    LEFT JOIN departments d
    ON e.department_id = d.department_id
    ORDER BY e.employee_id DESC
    `;

    db.query(sql, callback);
};

// Add Employee
exports.addEmployee = (data, callback) => {

    const sql = `
    INSERT INTO employees
    (
        full_name,
        cnic,
        email,
        phone,
        department_id,
        designation,
        joining_date,
        basic_salary,
        bank_account_number,
        status
    )
    VALUES (?,?,?,?,?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            data.full_name,
            data.cnic,
            data.email,
            data.phone,
            data.department_id,
            data.designation,
            data.joining_date,
            data.basic_salary,
            data.bank_account_number,
            data.status
        ],
        callback
    );
};

// Update Employee
exports.updateEmployee = (
    id,
    data,
    callback
) => {

    const sql = `
    UPDATE employees
    SET
    full_name=?,
    cnic=?,
    email=?,
    phone=?,
    department_id=?,
    designation=?,
    joining_date=?,
    basic_salary=?,
    bank_account_number=?,
    status=?
    WHERE employee_id=?
    `;

    db.query(
        sql,
        [
            data.full_name,
            data.cnic,
            data.email,
            data.phone,
            data.department_id,
            data.designation,
            data.joining_date,
            data.basic_salary,
            data.bank_account_number,
            data.status,
            id
        ],
        callback
    );
};

// Delete Employee
exports.deleteEmployee = (
    id,
    callback
) => {

    db.query(
        "DELETE FROM employees WHERE employee_id=?",
        [id],
        callback
    );
};

// Search Employee
exports.searchEmployee = (
    keyword,
    callback
) => {

    const sql = `
    SELECT
        e.*,
        d.department_name
    FROM employees e
    LEFT JOIN departments d
    ON e.department_id=d.department_id
    WHERE
    e.full_name LIKE ?
    OR e.employee_id LIKE ?
    OR d.department_name LIKE ?
    `;

    db.query(
        sql,
        [
            `%${keyword}%`,
            `%${keyword}%`,
            `%${keyword}%`
        ],
        callback
    );
};