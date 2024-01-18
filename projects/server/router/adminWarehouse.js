const express = require("express");
const router = express.Router();
const adminWarehouseController = require("../controllers/adminWarehouse");
const { checkRole } = require("../middlewares/apiValidatorMiddleware");
const queryValidation = require("../helpers/expressValidator");
const { body } = require("express-validator");

router.post(
  "/admin-warehouse",
  checkRole(["master"]),
  adminWarehouseController.assignAdminWarehouse
);
router.get(
  "/admin-warehouse/:user_id",
  checkRole(["admin", "master"]),
  adminWarehouseController.getAdminWarehouse
);
router.get(
  "/admin",
  checkRole(["admin", "master"]),
  adminWarehouseController.getAllAdmin
);
router.post(
  "/admin",
  queryValidation([
    body("name").notEmpty(),
    body("email").notEmpty(),
    body("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
    body("products.*.quantity").notEmpty(),
  ]),
  checkRole(["master"]),
  adminWarehouseController.createAdmin
);
router.patch(
  "/admin",
  queryValidation([
    body("name").notEmpty(),
    body("email").notEmpty(),
    body("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
    body("products.*.quantity").notEmpty(),
  ]),
  checkRole(["master"]),
  adminWarehouseController.updateAdmin
);
router.delete(
  "/admin/:user_id",
  checkRole(["master"]),
  adminWarehouseController.deleteAdmin
);

module.exports = router;
