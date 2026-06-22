const model =
require("../models/selfServiceModel");

// Profile

exports.profile =
(req,res)=>{

model.getProfile(

req.params.employeeId,

(err,result)=>{

if(err)
return res.status(500)
.json(err);

res.json(result[0]);

});

};

// Attendance

exports.attendance =
(req,res)=>{

model.getAttendance(

req.params.employeeId,

(err,result)=>{

if(err)
return res.status(500)
.json(err);

res.json(result);

});

};

// Payroll

exports.payroll =
(req,res)=>{

model.getPayroll(

req.params.employeeId,

(err,result)=>{

if(err)
return res.status(500)
.json(err);

res.json(result);

});

};

// Payslips

exports.payslips =
(req,res)=>{

model.getPayslips(

req.params.employeeId,

(err,result)=>{

if(err)
return res.status(500)
.json(err);

res.json(result);

});

};