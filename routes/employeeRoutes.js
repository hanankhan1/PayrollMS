const express =
require("express");

const router =
express.Router();

const controller =
require("../controllers/employeeController");

router.get(
    "/",
    controller.getEmployees
);

router.post(
    "/",
    controller.addEmployee
);

router.put(
    "/:id",
    controller.updateEmployee
);

router.delete(
    "/:id",
    controller.deleteEmployee
);

router.get(
    "/search/:keyword",
    controller.searchEmployee
);

module.exports = router;