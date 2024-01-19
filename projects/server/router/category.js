const express = require("express");
const { categories } = require("./../controllers/category");
const router = express.Router();
const {
  validateApi,
  checkRole,
} = require("../middlewares/apiValidatorMiddleware");

router.get("/categories", categories.getAllCategories);
router.post(
  "/category",
  validateApi,
  checkRole(["master"]),
  categories.createCategory
);
router.patch(
  "/category/:id",
  validateApi,
  checkRole(["master"]),
  categories.updateCategory
);
router.delete(
  "/category/:id",
  validateApi,
  checkRole(["master"]),
  categories.deleteCategory
);

module.exports = router;
