const { encryptData, decryptData } = require("../helpers/encrypt");
const db = require("../models");

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
    await req.transaction.commit();
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
  try {
    let whereClause = {};
    if (warehouse_id) {
      whereClause.warehouse_id = warehouse_id;
    }
    if (product_id) {
      const decryptedProductId = decryptData(product_id);
      if (decryptedProductId) {
        whereClause.product_id = decryptedProductId;
      }
    }
    const stock = await db.Stocks.findAll({
      where: whereClause,
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });
    let total = 0;
    const encryptedResult = stock.map(dt => {
      const newStock = { ...dt.dataValues };
      total += newStock.quantity;
      newStock.id = encryptData(newStock.id);
      newStock.warehouse_id = encryptData(newStock.warehouse_id);
      newStock.product_id = encryptData(newStock.product_id);
      return newStock;
    });
    return res.status(200).json({
      message: "Get Stock successfully",
      data: {
        total: total,
        warehouse: encryptedResult,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get stock failed",
      error: error.toString(),
    });
  }
};

module.exports = {
  createStock,
  getStock,
};
