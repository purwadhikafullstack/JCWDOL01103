const express = require("express");
const router = express.Router();
const stockMutationController = require("../controllers/stockMutation");
const queryValidation = require("../helpers/expressValidator");
const { body } = require("express-validator");
const { checkRole } = require("../middlewares/apiValidatorMiddleware");
const stockMiddleware = require("../middlewares/stockMiddleware");

router.post(
  "/stock-mutation",
  checkRole(["master", "admin"]),
  queryValidation([
    body("from_warehouse_id").notEmpty(),
    body("to_warehouse_id").notEmpty(),
    body("products.*.product_id").notEmpty(),
    body("products.*.quantity").notEmpty(),
  ]),
  stockMiddleware.checkStock,
  stockMutationController.createMutation
);

router.get(
  "/stock-mutation/:id",
  checkRole(["master", "admin"]),
  stockMutationController.getMutationById
);
router.get(
  "/stock-mutation",
  checkRole(["master", "admin"]),
  stockMutationController.getMutations
);
router.patch(
  "/stock-mutation/:id",
  checkRole(["master", "admin"]),
  queryValidation([
    body("status")
      .notEmpty()
      .isIn(["waiting", "accepted", "rejected", "auto", "cancelled"])
      .withMessage("status value not found"),
  ]),
  stockMutationController.changeMutationStatus
);
router.post("/stock-mutation/auto", stockMutationController.createAutoMutation)

module.exports = router;
