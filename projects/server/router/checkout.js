const express = require("express");
const { orders } = require("./../controllers/checkout");
const router = express.Router();
const {
  validateApi,
  checkRole,
} = require("../middlewares/apiValidatorMiddleware");

router.post("/checkout", validateApi, checkRole(["user"]), orders.createOrder);

module.exports = router;
