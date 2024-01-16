const express = require("express");
const router = express.Router();
const queryValidation = require("../helpers/expressValidator");
const { body } = require("express-validator");
const { checkRole } = require("../middlewares/apiValidatorMiddleware");
const { checkShippingCost } = require("../controllers/rajaongkir");

router.post(
  "/shipping",
  checkRole(["master", "admin", "user"]),
  queryValidation([
    body("origin").notEmpty(),
    body("destination").notEmpty(),
    body("weight").notEmpty(),
  ]),
  checkShippingCost
);

module.exports = router;
