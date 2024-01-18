const db = require("../models");
const category = db.Products_Category;
const { Op } = require("sequelize");

const categories = {
  getAllCategories: async (req, res) => {
    try {
      let query = {};
      if (req.query.search) {
        query.where = {
          name: {
            [Op.like]: `%${req.query.search}%`,
          },
        };
      }

      if (req.query.sort && req.query.order) {
        query.order = [[req.query.sort, req.query.order]];
      }

      const categories = await category.findAll(query);
      res.status(200).json({
        status: 200,
        message: "Request Success",
        error: null,
        data: categories,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Request Failed",
        error: e.toString(),
      });
    }
  },

  createCategory: async (req, res) => {
    const { name } = req.body;

    const existingCategory = await category.findOne({
      where: { name },
    });

    if (existingCategory) {
      return res.status(409).json({
        status: 409,
        message: "Category Name Already Exists",
      });
    }

    try {
      const categories = await category.create({
        name,
      });
      res.status(201).json({
        status: 201,
        message: "Category Successfully Created",
        error: null,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Create Category Failed",
        error: e.toString(),
      });
    }
  },

  updateCategory: async (req, res) => {
    const { name } = req.body;

    try {
      const areCategoryDuplicate = await category.findOne({
        where: { name },
      });

      if (areCategoryDuplicate) {
        return res.status(409).json({
          status: 409,
          message: "Category Name Already Exists",
        });
      }

      const existingCategory = await category.findOne({
        where: { id: req.params.id },
      });

      if (!existingCategory) {
        return res.status(404).json({
          status: 404,
          message: "Category Not Found",
          error: null,
          data: null,
        });
      }

      const categories = await category.update(
        {
          name,
        },
        {
          where: { id: req.params.id },
          returning: true,
        }
      );
      res.status(200).json({
        status: 200,
        message: "Category Successfully Updated",
        error: null,
        data: categories,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Update Category Failed",
        error: e.toString(),
      });
    }
  },

  deleteCategory: async (req, res) => {
    const categories = await category.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!categories) {
      return res.status(404).json({
        status: 404,
        message: "Category Not Found",
        error: null,
        data: null,
      });
    }

    try {
      const categories = await category.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({
        status: 200,
        message: "Category Successfully Deleted",
        error: null,
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Delete Category Failed",
        error: e.toString(),
      });
    }
  },
};

module.exports = { categories };
