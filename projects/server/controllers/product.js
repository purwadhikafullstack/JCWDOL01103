const db = require("../models");
const products = db.Products;

const product = {
  getSingleProduct: async (req, res) => {
    try {
      const product = await products.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!product) {
        return res.status(404).json({
          status: 404,
          message: "Product Not Found",
          error: null,
          data: null,
        });
      }

      res.status(200).json({
        status: 200,
        message: "Request Success",
        error: null,
        data: product,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Request Failed",
        error: e.toString(),
      });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const product = await products.findAll({});
      res.status(200).json({
        status: 200,
        message: "Request Success",
        error: null,
        data: product,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Request Failed",
        error: e.toString(),
      });
    }
  },

  createProduct: async (req, res) => {
    const {
      product_name,
      description,
      stock,
      product_category_id,
      price,
      weight,
      active,
      warehouse_id,
    } = req.body;
    const image = req.file;

    try {
      const existingProduct = await products.findOne({
        where: { product_name },
      });

      if (existingProduct) {
        return res.status(409).json({
          status: 409,
          message: "Product Name Already Exists",
        });
      }

      const product = await products.create({
        product_name,
        description,
        stock,
        product_category_id,
        price,
        weight,
        active,
        warehouse_id,
        image: image ? image.filename : null,
      });
      res.status(201).json({
        status: 201,
        message: "Product Successfully Created",
        error: null,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Create Product Failed",
        error: e.toString(),
      });
    }
  },

  updateProduct: async (req, res) => {
    const {
      product_name,
      description,
      stock,
      product_category_id,
      price,
      weight,
      active,
      warehouse_id,
    } = req.body;
    const image = req.file;

    try {
      const areProductDuplicate = await products.findOne({
        where: { product_name },
      });

      if (areProductDuplicate) {
        return res.status(409).json({
          status: 409,
          message: "Product Name Already Exists",
        });
      }

      const existingProduct = await products.findOne({
        where: { product_id: req.params.id },
      });

      const product = await products.update(
        {
          product_name: product_name || existingProduct.product_name,
          description: description || existingProduct.description,
          stock: stock || existingProduct.stock,
          product_category_id:
            product_category_id || existingProduct.product_category_id,
          price: price || existingProduct.price,
          weight: weight || existingProduct.weight,
          active: active || existingProduct.active,
          warehouse_id: warehouse_id || existingProduct.warehouse_id,
          image: image ? image.filename : existingProduct.image,
        },
        {
          where: { product_id: req.params.id },
          returning: true,
        }
      );
      res.status(200).json({
        status: 200,
        message: "Product Successfully Updated",
        error: null,
        data: product,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Update Product Failed",
        error: e.toString(),
      });
    }
  },

  deleteProduct: async (req, res) => {
    const product = await products.findOne({
      where: {
        product_id: req.params.id,
      },
    });

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: "Product Not Found",
        error: null,
        data: null,
      });
    }

    try {
      const product = await products.destroy({
        where: { product_id: req.params.id },
      });
      res.status(200).json({
        status: 200,
        message: "Product Successfully Deleted",
        error: null,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Delete Product Failed",
        error: e.toString(),
      });
    }
  },
};

module.exports = { product };
