const express = require("express");
const { carts } = require("./../controllers/cart");
const router = express.Router();
const {
  validateApi,
  checkRole,
} = require("../middlewares/apiValidatorMiddleware");

router.get("/cart", validateApi, checkRole(["user"]), carts.getAllCarts);
router.post("/cart", validateApi, checkRole(["user"]), carts.createCart);
router.delete("/cart/:id", validateApi, checkRole(["user"]), carts.deleteCart);

module.exports = router;
