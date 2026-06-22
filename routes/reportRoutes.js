const express =
require("express");

const router =
express.Router();

const controller =
require("../controllers/reportController");

router.get(
"/payroll-summary",
controller.payrollSummary
);

router.get(
"/department-salary",
controller.departmentSalary
);

router.get(
"/employee-history/:employeeId",
controller.employeeHistory
);

router.get(
"/attendance-report",
controller.attendanceReport
);

module.exports =
router;