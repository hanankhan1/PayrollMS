require("dotenv").config();

const express = require("express");
const cors = require("cors");
const departmentRoutes =
require("./routes/departmentRoutes");
const employeeRoutes =
require("./routes/employeeRoutes");
const attendanceRoutes =
require("./routes/attendanceRoutes");
const app = express();
const salaryStructureRoutes =
require("./routes/salaryStructureRoutes");
const payrollRoutes =
require("./routes/payrollRoutes");
const payslipRoutes =
require("./routes/payslipRoutes");
const reportRoutes =
require("./routes/reportRoutes");
const selfServiceRoutes =
require("./routes/selfServiceRoutes");
const userRoutes =
require("./routes/userRoutes");
const dashboardRoutes =
require("./routes/dashboardRoutes");

app.use(cors());
app.use(express.json());


app.use(
"/api/dashboard",
dashboardRoutes
);


app.use(
"/api/users",
userRoutes
);

app.use(
"/api/self-service",
selfServiceRoutes
);
app.use(
"/api/reports",
reportRoutes
);
app.use(
"/api/payslips",
payslipRoutes
);

app.use(
"/api/payroll",
payrollRoutes
);

app.use(
"/api/salary-structure",
salaryStructureRoutes
);
app.use(
"/api/attendance",
attendanceRoutes
);
app.use(
    "/api/employees",
    employeeRoutes
);
app.use(
    "/api/departments",
    departmentRoutes
);
app.use(
    "/api/auth",
    require("./routes/authRoutes")
);

app.listen(
    process.env.PORT,
    ()=>{
        console.log(
            `Server Running On Port ${process.env.PORT}`
        );
    }
);