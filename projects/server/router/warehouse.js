const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse");
const { check } = require("express-validator");
const queryValidation = require("../helpers/expressValidator");
const geolocationMiddleware = require("../middlewares/geolocationMiddleware");
const { checkRole } = require("../middlewares/apiValidatorMiddleware");

router.get("/warehouses/:id", warehouseController.getWarehouse);
router.get("/warehouses", warehouseController.getWarehouses);
router.delete(
  "/warehouses/:id",
  checkRole(["master"]),
  warehouseController.deleteWarehouse
);
router.post(
  "/warehouses",
  checkRole(["master"]),
  queryValidation([check("name").notEmpty(), check("city_id").notEmpty()]),
  geolocationMiddleware.getGeoLocation,
  warehouseController.createWarehouse
);
router.patch(
  "/warehouses/:id",
  checkRole(["master"]),
  queryValidation([check("name").notEmpty(), check("city_id").notEmpty()]),
  warehouseController.updateWarehouse
);

module.exports = router;
