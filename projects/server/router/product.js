const express = require("express");
const { productController } = require("./../controllers/product");
const { multerUpload } = require("../middlewares/multer");
const router = express.Router();

router.get("/product/:id", productController.getSingleProduct);
router.get("/products", productController.getAllProducts);
router.post(
  "/product",
  multerUpload.single("image"),
  productController.createProduct
);
router.patch(
  "/product/:id",
  multerUpload.single("image"),
  productController.updateProduct
);
router.delete("/product/:id", productController.deleteProduct);

module.exports = router;
