const { encryptData, decryptData } = require("../helpers/encrypt");
const db = require("../models");
const products = db.Products;
const category = db.Products_Category;
const sub_category = db.Products_Sub_Category;
const stocks = db.Stocks;
const { Op } = require("sequelize");

const product = {
  getSingleProduct: async (req, res) => {
    try {
      const { id } = req.params;
      let decryptedId;

      try {
        decryptedId = decryptData(id);
      } catch (error) {
        return res.status(400).json({
          status: 400,
          message: "Invalid Product ID",
          error: error.toString(),
        });
      }

      const productData = await products.findOne({
        where: { id: decryptData(id) },
        include: [
          {
            model: category,
            as: "product_category",
            attributes: ["name"],
          },
          {
            model: sub_category,
            as: "product_sub_category",
            attributes: ["name"],
          },
          {
            model: stocks,
            as: "stock",
          },
        ],
      });

      if (!productData) {
        return res.status(404).json({
          status: 404,
          message: "Product Not Found",
          error: null,
          data: null,
        });
      }

      const encryptedProduct = {
        ...productData.dataValues,
        id: encryptData(productData.id.toString()),
      };

      res.status(200).json({
        status: 200,
        message: "Request Success",
        error: null,
        data: encryptedProduct,
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
      let query = {};
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      if (req.query.search) {
        query.where = {
          product_name: {
            [Op.like]: `%${req.query.search}%`,
          },
        };
      }

      if (req.query.categories) {
        const categoryIds = req.query.categories
          .split(",")
          .map(id => parseInt(id));
        query.include = query.include || [];
        query.include.push({
          model: category,
          as: "product_category",
          where: { id: { [Op.in]: categoryIds } },
          required: true,
        });
      }

      if (req.query.sort && req.query.order) {
        query.order = [[req.query.sort, req.query.order]];
      }

      const { count, rows } = await products.findAndCountAll({
        include: [
          {
            model: category,
            as: "product_category",
            attributes: ["id", "name"],
          },
          {
            model: sub_category,
            as: "product_sub_category",
            attributes: ["id", "name"],
          },
          {
            model: stocks,
            as: "stock",
          },
        ],
        ...query,
        limit: limit,
        offset: offset,
      });

      const totalPages = Math.ceil(count / limit);

      const encryptedProducts = rows.map(product => ({
        ...product.dataValues,
        id: encryptData(product.id.toString()),
      }));

      res.status(200).json({
        status: 200,
        message: "Request Success",
        error: null,
        data: encryptedProducts,
        totalPages: totalPages,
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
      product_category,
      product_sub_category,
      price,
      weight,
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

      let categoryCheck = await category.findOne({
        where: { name: product_category },
      });

      if (!categoryCheck) {
        categoryCheck = await category.create({
          name: product_category,
        });
      }

      let subCategoryCheck = await sub_category.findOne({
        where: {
          name: product_sub_category,
          product_category_id: categoryCheck.id,
        },
      });

      if (!subCategoryCheck) {
        subCategoryCheck = await sub_category.create({
          name: product_sub_category,
          product_category_id: categoryCheck.id,
        });
      }

      const product = await products.create({
        product_name,
        description,
        product_category_id: categoryCheck.id,
        product_sub_category_id: subCategoryCheck.id,
        price,
        weight,
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
    const { id } = req.params;
    const {
      product_name,
      description,
      price,
      weight,
      product_category,
      product_sub_category,
    } = req.body;
    const image = req.file ? req.file.filename : undefined;

    try {
      const existingProductWithName = await products.findOne({
        where: {
          product_name,
          id: { [Op.ne]: decryptData(id) },
        },
      });

      if (existingProductWithName) {
        return res.status(409).json({
          status: 409,
          message: "Product Name Already Exists",
        });
      }

      let categoryCheck = await category.findOne({
        where: { name: product_category },
      });

      if (!categoryCheck) {
        categoryCheck = await category.create({ name: product_category });
      }

      let subCategoryCheck = await sub_category.findOne({
        where: {
          name: product_sub_category,
          product_category_id: categoryCheck.id,
        },
      });

      if (!subCategoryCheck) {
        subCategoryCheck = await sub_category.create({
          name: product_sub_category,
          product_category_id: categoryCheck.id,
        });
      }

      const productToUpdate = await products.findByPk(decryptData(id)); // Decrypt the ID

      if (!productToUpdate) {
        return res.status(404).json({
          status: 404,
          message: "Product Not Found",
        });
      }

      await productToUpdate.update({
        product_name: product_name || productToUpdate.product_name,
        description: description || productToUpdate.description,
        price: price || productToUpdate.price,
        weight: weight || productToUpdate.weight,
        product_category_id: categoryCheck.id,
        product_sub_category_id: subCategoryCheck.id,
        image: image || productToUpdate.image,
      });

      res.status(200).json({
        status: 200,
        message: "Product Successfully Updated",
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
    try {
      const { id } = req.params;
      let decryptedId;

      try {
        decryptedId = decryptData(id);
      } catch (error) {
        return res.status(400).json({
          status: 400,
          message: "Invalid Product ID",
          error: error.toString(),
        });
      }

      const product = await products.findOne({
        where: { id: decryptedId },
      });

      if (!product) {
        return res.status(404).json({
          status: 404,
          message: "Product Not Found",
        });
      }

      await products.destroy({
        where: { id: decryptedId },
      });

      res.status(200).json({
        status: 200,
        message: "Product Successfully Deleted",
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
