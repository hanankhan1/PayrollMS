const express =
require("express");

const router =
express.Router();

const controller =
require("../controllers/userController");

router.get(
    "/",
    controller.getUsers
);

router.get(
    "/employees",
    controller.getEmployeesWithoutUser
);

router.post(
    "/",
    controller.createUser
);

router.delete(
    "/:id",
    controller.deleteUser
);
router.put("/:id", controller.updateUser);

module.exports = router;