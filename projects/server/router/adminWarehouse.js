const express = require("express");
const router = express.Router();
const adminWarehouseController = require("../controllers/adminWarehouse");
const { checkRole } = require("../middlewares/apiValidatorMiddleware");

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
// router.get(
//   "/admin-warehouse"
// )

module.exports = router;
