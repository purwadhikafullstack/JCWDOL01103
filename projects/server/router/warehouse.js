const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse");
const { check } = require("express-validator");
const queryValidation = require("../helpers/expressValidator");
const geolocationMiddleware = require("../middlewares/geolocationMiddleware")

router.get("/warehouses/:id", warehouseController.getWarehouse);
router.delete("/warehouses/:id", warehouseController.deleteWarehouse);
router.get("/warehouses", warehouseController.getWarehouses);
router.post(
  "/warehouses",
  queryValidation([check("name").notEmpty(), check("city_id").notEmpty()]),
  geolocationMiddleware.getGeoLocation,
  warehouseController.createWarehouse
);
router.patch(
  "/warehouses/:id",
  queryValidation([check("name").notEmpty(), check("city_id").notEmpty()]),
  warehouseController.updateWarehouse
);

module.exports = router;
