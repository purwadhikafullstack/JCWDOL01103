const express = require("express");
const { categories } = require("./../controllers/category");
const router = express.Router();
// const { check } = require("express-validator");
const { checkRole } = require("../middlewares/apiValidatorMiddleware");

router.get("/categories", categories.getAllCategories);
router.post("/category", categories.createCategory);
router.patch("/category/:id", categories.updateCategory);
router.delete("/category/:id", categories.deleteCategory);

module.exports = router;
