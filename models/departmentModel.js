const db = require("../config/db");

exports.getAllDepartments = (callback) => {

    db.query(
        "SELECT * FROM departments ORDER BY department_id DESC",
        callback
    );
};

exports.addDepartment = (data, callback) => {

    const sql =
    `
    INSERT INTO departments
    (department_name,description)
    VALUES (?,?)
    `;

    db.query(
        sql,
        [
            data.department_name,
            data.description
        ],
        callback
    );
};

exports.updateDepartment = (
    id,
    data,
    callback
) => {

    const sql =
    `
    UPDATE departments
    SET
    department_name=?,
    description=?
    WHERE department_id=?
    `;

    db.query(
        sql,
        [
            data.department_name,
            data.description,
            id
        ],
        callback
    );
};

exports.deleteDepartment = (
    id,
    callback
) => {

    db.query(
        "DELETE FROM departments WHERE department_id=?",
        [id],
        callback
    );
};

exports.searchDepartment = (
    keyword,
    callback
) => {

    db.query(
        `
        SELECT *
        FROM departments
        WHERE department_name
        LIKE ?
        `,
        [`%${keyword}%`],
        callback
    );
};