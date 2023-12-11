const { encryptData, decryptData } = require("../helpers/encrypt");
const db = require("../models");
const { Op } = require("sequelize");

const createStock = async (req, res) => {
  const { journal_type, amount } = req.body;
  try {
    const lastJournal = await db.Stock_Journals.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        stock_id: req.stock.id,
      },
    });
    req.differeces = journal_type === "reducing" ? amount * -1 : amount;
    if (lastJournal) {
      if (journal_type === "reducing" && lastJournal.quantity_after < amount) {
        return res.status(400).json({
          message: "Amount must be greater than before stock quantity",
        });
      }
      req.afterQty = lastJournal.quantity_after + amount;
    }
    let updatedQty = req.afterQty || amount;
    let qtyBefore = lastJournal ? lastJournal.quantity_after : 0;
    await db.Stock_Journals.create({
      stock_id: req.stock.id,
      quantity_before: qtyBefore,
      quantity_after: updatedQty,
      amount: req.differeces,
    });
    await db.Stocks.update(
      {
        quantity: updatedQty,
      },
      {
        where: {
          id: req.stock.id,
        },
      }
    );
    return res.status(200).json({
      message: "Create journal successfully",
    });
  } catch (error) {
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
    // whereClause.warehouse_id = decryptData(warehouse_id);
    whereClause.warehouse_id = warehouse_id;
  }
  if (product_id) {
    // whereClause.product_id = decryptData(product_id);
    whereClause.product_id = product_id;
  }
  try {
    const stock = await db.Stocks.findAll({
      where: whereClause,
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });
    const encryptedResult = stock.map((dt) => {
      const newStock = { ...dt.dataValues };
      newStock.id = encryptData(newStock.id);
        newStock.warehouse_id = encryptData(newStock.warehouse_id);
        newStock.product_id = encryptData(newStock.product_id);
      return newStock;
    });
    return res.status(200).json({
      message: "Get Stock successfully",
      data: encryptedResult,
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
        attributes: ["quantity"]
      },
    });
    let result = null
    if(products && warehouse_id){
        const resProducts = products.map(dt => {
            const newProducts = { ...dt.dataValues };
            newProducts.stock =  dt.stock[0].quantity;
            return newProducts
        })
        result = resProducts
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
