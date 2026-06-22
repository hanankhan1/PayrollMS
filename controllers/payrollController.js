const db =
require("../config/db");

const model =
require("../models/payrollModel");

// Get Payrolls

exports.getPayrolls = (
    req,
    res
) => {

    model.getPayrolls(
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json(result);
        }
    );
};

// Generate Payroll

exports.generatePayroll =
(req,res)=>{

const employeeId =
req.body.employee_id;

const month =
req.body.payroll_month;

const year =
req.body.payroll_year;

const employeeQuery = `
SELECT *
FROM employees
WHERE employee_id=?
`;

db.query(
employeeQuery,
[employeeId],
(err,employeeResult)=>{

if(err)
return res.status(500)
.json(err);

const employee =
employeeResult[0];

const structureQuery = `
SELECT *
FROM salary_structure
WHERE employee_id=?
`;

db.query(
structureQuery,
[employeeId],
(err,structureResult)=>{

if(err)
return res.status(500)
.json(err);

const structure =
structureResult[0];

const attendanceQuery = `
SELECT COUNT(*) AS absent_days
FROM attendance
WHERE employee_id=?
AND attendance_status='Absent'
AND MONTH(attendance_date)=?
AND YEAR(attendance_date)=?
`;

db.query(
attendanceQuery,
[
employeeId,
month,
year
],
(err,attendanceResult)=>{

if(err)
return res.status(500)
.json(err);

const absentDays =
attendanceResult[0]
.absent_days;

const allowances =

Number(
structure.house_allowance
)

+

Number(
structure.medical_allowance
)

+

Number(
structure.transport_allowance
);

const attendanceDeduction =

(
employee.basic_salary
/
30
)

*
absentDays;

const deductions =

Number(structure.tax)

+

Number(
structure.loan_deduction
)

+

Number(
structure.other_deduction
)

+

attendanceDeduction;

const grossSalary =

Number(
employee.basic_salary
)

+

allowances;

const netSalary =

grossSalary -
deductions;

const payrollData = {

employee_id:
employeeId,

payroll_month:
month,

payroll_year:
year,

basic_salary:
employee.basic_salary,

total_allowances:
allowances,

total_deductions:
deductions,

absent_days:
absentDays,

attendance_deduction:
attendanceDeduction,

gross_salary:
grossSalary,

net_salary:
netSalary

};

model.generatePayroll(
payrollData,
(err,result)=>{

if(err)
return res.status(500)
.json(err);

res.json({

message:
"Payroll Generated",

payrollData

});

});

});

});

});

}

// Delete

exports.deletePayroll =
(req,res)=>{

model.deletePayroll(
req.params.id,
(err,result)=>{

if(err)
return res.status(500)
.json(err);

res.json({
message:
"Payroll Deleted"
});

});
};