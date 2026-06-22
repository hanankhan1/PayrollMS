const model =
require("../models/reportModel");

// Payroll Summary

exports.payrollSummary =
(req,res)=>{

model.payrollSummary(
(err,result)=>{

if(err)
return res.status(500)
.json(err);

res.json(result);

});
};

// Department Salary

exports.departmentSalary =
(req,res)=>{

model.departmentSalary(
(err,result)=>{

if(err)
return res.status(500)
.json(err);

res.json(result);

});
};

// Employee History

exports.employeeHistory =
(req,res)=>{

model.employeeHistory(
req.params.employeeId,

(err,result)=>{

if(err)
return res.status(500)
.json(err);

res.json(result);

});
};

// Attendance Report

exports.attendanceReport =
(req,res)=>{

model.attendanceReport(
(err,result)=>{

if(err)
return res.status(500)
.json(err);

res.json(result);

});
};