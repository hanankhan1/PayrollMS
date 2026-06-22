const express =
require("express");

const router =
express.Router();

const controller =
require("../controllers/selfServiceController");

router.get(
"/profile/:employeeId",
controller.profile
);

router.get(
"/attendance/:employeeId",
controller.attendance
);

router.get(
"/payroll/:employeeId",
controller.payroll
);

router.get(
"/payslips/:employeeId",
controller.payslips
);

module.exports = router;