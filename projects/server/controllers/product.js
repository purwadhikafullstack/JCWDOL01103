const db = require("../models");
const products = db.Products;
const category = db.Products_Category;
const sub_category = db.Products_Sub_Category;
const { Op } = require("sequelize");

const product = {
  getSingleProduct: async (req, res) => {
    try {
      const product = await products.findOne({
        where: { id: req.params.id },
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
        ],
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
          where: {
            id: { [Op.in]: categoryIds },
          },
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
        ],
        ...query,
        limit: limit,
        offset: offset,
      });

      const totalPages = Math.ceil(count / limit);

      res.status(200).json({
        status: 200,
        message: "Request Success",
        error: null,
        data: rows,
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
          id: { [Op.ne]: id },
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

      const productToUpdate = await products.findByPk(id);

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

    try {
      const product = await products.destroy({
        where: { id: req.params.id },
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
