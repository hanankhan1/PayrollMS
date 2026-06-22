const db =
require("../config/db");

// Profile

exports.getProfile =
(employeeId,callback)=>{

const sql=`

SELECT

e.*,
d.department_name

FROM employees e

LEFT JOIN departments d
ON e.department_id=d.department_id

WHERE e.employee_id=?

`;

db.query(
sql,
[employeeId],
callback
);

};

// Attendance

exports.getAttendance =
(employeeId,callback)=>{

const sql=`

SELECT *
FROM attendance

WHERE employee_id=?

ORDER BY attendance_date DESC

`;

db.query(
sql,
[employeeId],
callback
);

};

// Payroll

exports.getPayroll =
(employeeId,callback)=>{

const sql=`

SELECT *
FROM payroll

WHERE employee_id=?

ORDER BY payroll_year DESC,
payroll_month DESC

`;

db.query(
sql,
[employeeId],
callback
);

};

// Payslips

exports.getPayslips =
(employeeId,callback)=>{

const sql=`

SELECT

ps.*,
p.payroll_month,
p.payroll_year

FROM payslips ps

JOIN payroll p
ON ps.payroll_id=p.payroll_id

WHERE p.employee_id=?

`;

db.query(
sql,
[employeeId],
callback
);

};