const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stock");
const stockMiddleware = require("../middlewares/stockMiddleware");
const queryValidation = require("../helpers/expressValidator");
const { check, body } = require("express-validator");
const { checkRole } = require("../middlewares/apiValidatorMiddleware");

router.post(
  "/stock",
  checkRole(['master','admin']),
  queryValidation([
    check("warehouse_id").notEmpty(),
    check("product_id").notEmpty(),
    check("journal_type").notEmpty(),
    body("amount").notEmpty().isInt({min:1}).toInt()
  ]),
  stockMiddleware.checkStock,
  stockController.createStock
);

router.get("/stock", stockController.getStock)
router.get("/products", stockController.getProducts)
router.get("/products/:id", stockController.getProduct)

module.exports = router;
