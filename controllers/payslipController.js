const PDFDocument =
require("pdfkit");

const fs =
require("fs");

const path =
require("path");

const db =
require("../config/db");

const model =
require("../models/payslipModel");

// Get All

exports.getPayslips = (
    req,
    res
) => {

    model.getPayslips(
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json(result);
        }
    );
};

// Generate Payslip

exports.generatePayslip =
(req,res)=>{
const role =
req.headers.role;

if(
role !== "Admin" &&
role !== "Payroll Officer"
){
return res.status(403)
.json({
message:
"Access Denied"
});
}
const payrollId =
req.params.payrollId;

const sql = `
SELECT
p.*,
e.full_name,
e.designation,
e.cnic
FROM payroll p
JOIN employees e
ON p.employee_id=e.employee_id
WHERE p.payroll_id=?
`;

db.query(
sql,
[payrollId],
(err,result)=>{

if(err)
return res.status(500)
.json(err);

const payroll =
result[0];

if(!payroll){

return res.status(404)
.json({
message:
"Payroll Not Found"
});

}

const folder =
path.join(
__dirname,
"..",
"generated_payslips"
);

if(!fs.existsSync(folder))
fs.mkdirSync(folder);

const fileName =

`Payslip_${payrollId}.pdf`;

const filePath =

path.join(
folder,
fileName
);

const doc =
new PDFDocument();

doc.pipe(
fs.createWriteStream(
filePath
)
);

doc.fontSize(22)
.text(
"Payroll Management System",
{
align:"center"
}
);

doc.moveDown();

doc.fontSize(18)
.text(
"Employee Payslip"
);

doc.moveDown();

doc.text(
`Employee: ${payroll.full_name}`
);

doc.text(
`CNIC: ${payroll.cnic}`
);

doc.text(
`Designation: ${payroll.designation}`
);

doc.moveDown();

doc.text(
`Payroll Month: ${payroll.payroll_month}`
);

doc.text(
`Payroll Year: ${payroll.payroll_year}`
);

doc.moveDown();

doc.text(
`Basic Salary: ${payroll.basic_salary}`
);

doc.text(
`Allowances: ${payroll.total_allowances}`
);

doc.text(
`Deductions: ${payroll.total_deductions}`
);

doc.text(
`Absent Days: ${payroll.absent_days}`
);

doc.text(
`Gross Salary: ${payroll.gross_salary}`
);

doc.text(
`Net Salary: ${payroll.net_salary}`
);

doc.end();

model.savePayslip(
payrollId,
fileName,
(err)=>{

if(err)
return res.status(500)
.json(err);

res.json({

message:
"Payslip Generated",

fileName

});

});

});

};

// Download PDF

exports.downloadPayslip =
(req,res)=>{

const fileName =
req.params.fileName;

const filePath =
path.join(
__dirname,
"..",
"generated_payslips",
fileName
);

res.download(
filePath
);

};
exports.getEmployeePayslips =
(req,res)=>{

    const employeeId =
    req.params.employeeId;

    model.getEmployeePayslips(
        employeeId,
        (err,result)=>{

            if(err)
                return res.status(500)
                .json(err);

            res.json(result);
        }
    );
};