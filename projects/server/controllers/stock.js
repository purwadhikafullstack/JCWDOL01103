const { encryptData, decryptData } = require("../helpers/encrypt");
const db = require("../models");
const { Op } = require("sequelize");

const createStock = async (req, res) => {
  const { type } = req.body;
  let results = [];
  try {
    for (const item of req.stock) {
      let stockId = item.stock.dataValues?.id;
      let amount = item?.restock;
      let qty = item.stock.dataValues?.quantity;
      let differences = type === "reducing" ? amount * -1 : amount;
      if (type === "reducing") {
        if (qty >= amount) {
          await db.Stocks.decrement("quantity", {
            by: amount,
            where: {
              id: stockId,
            },
            transaction: req.transaction,
          });
        } else {
          return res.status(400).json({
            message: "Amount must be greater than quantity before",
            error: "Amount must be greater than quantity before",
          });
        }
      } else if (type === "adding") {
        await db.Stocks.increment("quantity", {
          by: amount,
          where: {
            id: stockId,
          },
          transaction: req.transaction,
        });
      } else {
        return res.status(400).json({
          message: "Wrong journal type",
        });
      }
      await db.Stock_Journals.create(
        {
          stock_id: stockId,
          quantity_before: qty,
          quantity_after: qty + differences,
          amount: differences,
        },
        { transaction: req.transaction }
      );
    }
    await req.transaction.commit()
    return res.status(200).json({
      message: "Restock product successfully",
      data: results,
    });
  } catch (error) {
    await req.transaction.rollback();
    return res.status(500).json({
      message: "Create journal failed",
      error: error.toString(),
    });
  }
};

const getStock = async (req, res) => {
  const { warehouse_id, product_id } = req.query;
  let whereClause = {};
  if (warehouse_id) {
    whereClause.warehouse_id = warehouse_id;
  }
  if (product_id) {
    whereClause.product_id = product_id;
  }
  try {
    const stock = await db.Stocks.findAll({
      where: whereClause,
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });
    let total = 0
    const encryptedResult = stock.map((dt) => {
      const newStock = { ...dt.dataValues };
      total += newStock.quantity
      newStock.id = encryptData(newStock.id);
      newStock.warehouse_id = encryptData(newStock.warehouse_id);
      newStock.product_id = encryptData(newStock.product_id);
      return newStock;
    });
    return res.status(200).json({
      message: "Get Stock successfully",
      data: {
        total: total,
        warehouse: encryptedResult
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get stock failed",
      error: error.toString(),
    });
  }
};

const getProducts = async (req, res) => {
  const { product_id, warehouse_id } = req.query;
  try {
    let whereClause = {};
    let whereClause2 = {};
    if (product_id) {
      whereClause.id = product_id;
    }
    if (warehouse_id) {
      whereClause2["$stock.warehouse_id$"] = warehouse_id;
    }
    const products = await db.Products.findAll({
      where: { [Op.and]: [whereClause, whereClause2] },
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      include: {
        model: db.Stocks,
        as: "stock",
        attributes: ["quantity"],
      },
    });
    let result = null;
    if (products && warehouse_id) {
      const resProducts = products.map((dt) => {
        const newProducts = { ...dt.dataValues };
        newProducts.stock = dt.stock[0].quantity;
        return newProducts;
      });
      result = resProducts;
    }
    return res.status(200).json({
      message: "Get products successfully",
      data: result ? result : products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get products failed",
      error: error.toString(),
    });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await db.Products.findOne({
      where: { id: id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
      include: {
        model: db.Stocks,
        as: "stock",
      },
    });
    return res.status(200).json({
      message: "Get products successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get products failed",
      error: error.toString(),
    });
  }
};

module.exports = { createStock, getStock, getProducts, getProduct };
