const db = require("../config/db");

// Get All Attendance
exports.getAttendance = (callback) => {

    const sql = `
    SELECT
        a.*,
        e.full_name
    FROM attendance a
    JOIN employees e
    ON a.employee_id = e.employee_id
    ORDER BY attendance_date DESC
    `;

    db.query(sql, callback);
};

// Add Attendance
exports.addAttendance = (
    data,
    callback
) => {

    const sql = `
    INSERT INTO attendance
    (
        employee_id,
        attendance_date,
        check_in_time,
        check_out_time,
        attendance_status
    )
    VALUES (?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            data.employee_id,
            data.attendance_date,
            data.check_in_time,
            data.check_out_time,
            data.attendance_status
        ],
        callback
    );
};

// Update Attendance
exports.updateAttendance = (
    id,
    data,
    callback
) => {

    const sql = `
    UPDATE attendance
    SET
    employee_id=?,
    attendance_date=?,
    check_in_time=?,
    check_out_time=?,
    attendance_status=?
    WHERE attendance_id=?
    `;

    db.query(
        sql,
        [
            data.employee_id,
            data.attendance_date,
            data.check_in_time,
            data.check_out_time,
            data.attendance_status,
            id
        ],
        callback
    );
};

// Delete Attendance
exports.deleteAttendance = (
    id,
    callback
) => {

    db.query(
        "DELETE FROM attendance WHERE attendance_id=?",
        [id],
        callback
    );
};