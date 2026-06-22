const db = require("../config/db");

exports.getUsers = (callback) => {
    const sql = `
    SELECT
        u.user_id,
        u.username,
        u.role,
        e.employee_id,
        e.full_name
    FROM users u
    LEFT JOIN employees e
    ON u.user_id = e.user_id
    ORDER BY u.user_id DESC
    `;
    db.query(sql, callback);
};

exports.getEmployeesWithoutUser = (callback) => {
    const sql = `
    SELECT
        employee_id,
        full_name
    FROM employees
    WHERE user_id IS NULL
    `;
    db.query(sql, callback);
};

exports.createUser = (user, callback) => {
    const sql = `
    INSERT INTO users
    (username,password,role)
    VALUES (?,?,?)
    `;
    db.query(
        sql,
        [
            user.username,
            user.password,
            user.role
        ],
        callback
    );
};

exports.linkEmployee = (userId, employeeId, callback) => {
    const sql = `
    UPDATE employees
    SET user_id=?
    WHERE employee_id=?
    `;
    db.query(sql, [userId, employeeId], callback);
};

exports.deleteUser = (id, callback) => {
    db.query("DELETE FROM users WHERE user_id=?", [id], callback);
};

// Update user – all fields required
exports.updateUser = (userId, userData, callback) => {
    const { username, password, role } = userData;
    const sql = `
        UPDATE users 
        SET username = ?, password = ?, role = ?
        WHERE user_id = ?
    `;
    db.query(sql, [username, password, role, userId], callback);
};