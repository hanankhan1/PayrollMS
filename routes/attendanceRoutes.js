const express =
require("express");

const router =
express.Router();

const controller =
require("../controllers/attendanceController");

router.get(
    "/",
    controller.getAttendance
);

router.post(
    "/",
    controller.addAttendance
);

router.put(
    "/:id",
    controller.updateAttendance
);

router.delete(
    "/:id",
    controller.deleteAttendance
);

module.exports = router;