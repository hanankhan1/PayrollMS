const db = require("../config/db");

// Get All
exports.getAll = (callback) => {

    const sql = `
    SELECT
        s.*,
        e.full_name
    FROM salary_structure s
    JOIN employees e
    ON s.employee_id = e.employee_id
    ORDER BY structure_id DESC
    `;

    db.query(sql, callback);
};

// Add
exports.add = (data, callback) => {

    const sql = `
    INSERT INTO salary_structure
    (
        employee_id,
        house_allowance,
        medical_allowance,
        transport_allowance,
        tax,
        loan_deduction,
        other_deduction
    )
    VALUES (?,?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            data.employee_id,
            data.house_allowance,
            data.medical_allowance,
            data.transport_allowance,
            data.tax,
            data.loan_deduction,
            data.other_deduction
        ],
        callback
    );
};

// Update
exports.update = (
    id,
    data,
    callback
) => {

    const sql = `
    UPDATE salary_structure
    SET
    employee_id=?,
    house_allowance=?,
    medical_allowance=?,
    transport_allowance=?,
    tax=?,
    loan_deduction=?,
    other_deduction=?
    WHERE structure_id=?
    `;

    db.query(
        sql,
        [
            data.employee_id,
            data.house_allowance,
            data.medical_allowance,
            data.transport_allowance,
            data.tax,
            data.loan_deduction,
            data.other_deduction,
            id
        ],
        callback
    );
};

// Delete
exports.delete = (
    id,
    callback
) => {

    db.query(
        "DELETE FROM salary_structure WHERE structure_id=?",
        [id],
        callback
    );
};