const db = require("../config/db");

exports.findUserByUsername = (username, callback) => {
    const sql = `
        SELECT 
            u.user_id, 
            u.username, 
            u.password, 
            u.role,
            e.employee_id,
            e.full_name
        FROM users u
        LEFT JOIN employees e ON u.user_id = e.user_id
        WHERE u.username = ?
    `;
    db.query(sql, [username], callback);
};

exports.createUser = (user, callback) => {
    const sql = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)";
    db.query(sql, [user.username, user.password, user.role], callback);
};