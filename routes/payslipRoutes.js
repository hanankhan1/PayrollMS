const express =
require("express");

const router =
express.Router();

const controller =
require("../controllers/payslipController");

router.get(
"/",
controller.getPayslips
);

router.post(
"/generate/:payrollId",
controller.generatePayslip
);

router.get(
"/download/:fileName",
controller.downloadPayslip
);

module.exports =
router;
router.get(
"/employee/:employeeId",
controller.getEmployeePayslips
);