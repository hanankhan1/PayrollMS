const express =
require("express");

const router =
express.Router();

const controller =
require("../controllers/payrollController");

router.get(
"/",
controller.getPayrolls
);

router.post(
"/generate",
controller.generatePayroll
);

router.delete(
"/:id",
controller.deletePayroll
);

module.exports =
router;