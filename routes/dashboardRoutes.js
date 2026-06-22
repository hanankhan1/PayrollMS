const express =
require("express");

const router =
express.Router();

const controller =
require("../controllers/dashboardController");

router.get(
"/admin",
controller.adminStats
);

router.get(
"/hr",
controller.hrStats
);

router.get(
"/payroll",
controller.payrollStats
);

router.get(
"/employee/:employeeId",
controller.employeeStats
);

module.exports = router;