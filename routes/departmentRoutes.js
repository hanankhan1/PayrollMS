const express =
require("express");

const router =
express.Router();

const controller =
require("../controllers/departmentController");

router.get(
    "/",
    controller.getDepartments
);

router.post(
    "/",
    controller.addDepartment
);

router.put(
    "/:id",
    controller.updateDepartment
);

router.delete(
    "/:id",
    controller.deleteDepartment
);

router.get(
    "/search/:keyword",
    controller.searchDepartment
);

module.exports = router;