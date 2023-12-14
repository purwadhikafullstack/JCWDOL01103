const express = require("express");
const { product } = require("./../controllers/product");
const { multerUpload } = require("../middlewares/multer");
const router = express.Router();

router.get("/product/:id", product.getSingleProduct);
router.get("/products", product.getAllProducts);
router.post("/product", multerUpload.single("image"), product.createProduct);
router.patch(
  "/product/:id",
  multerUpload.single("image"),
  product.updateProduct
);
router.delete("/product/:id", product.deleteProduct);

module.exports = router;
