const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const queryValidation = require("../helpers/expressValidator");
const addressController = require("../controllers/address");
const geolocationMiddleware = require("../middlewares/geolocationMiddleware");
const { checkRole } = require("../middlewares/apiValidatorMiddleware");
const apiValidatorMiddleware = require("../middlewares/apiValidatorMiddleware")

router.post(
  "/addresses",
  checkRole(["user"]),
  queryValidation([
    check("city_id").notEmpty(),
    check("name").notEmpty(),
    check("street").notEmpty(),
  ]),
  geolocationMiddleware.getGeoLocation,
  addressController.createAddress
);
router.get("/addresses", checkRole(["user"]), addressController.getAddresses);
router.get("/addresses/:id", checkRole(["user"]), addressController.getAddress);
router.patch(
  "/addresses/:id",
  checkRole(["user"]),
  queryValidation([
    check("city_id").notEmpty(),
    check("name").notEmpty(),
    check("street").notEmpty(),
  ]),
  addressController.updateAddress
);
router.post(
  "/addresses/primary",
  checkRole(["user"]),
  queryValidation([
    check("id").notEmpty(),
  ]),
  addressController.setPrimaryAddress
);
router.delete("/addresses/:id", addressController.deleteAddress);
module.exports = router;
