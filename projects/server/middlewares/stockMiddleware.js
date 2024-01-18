const { decryptData } = require("../helpers/encrypt");
const db = require("../models");

const checkStock = async (req, res, next) => {
  const { warehouse_id, from_warehouse_id, products } = req.body;
  try {
    req.transaction = await db.sequelize.transaction();
    let warehouseId = warehouse_id || from_warehouse_id
    const result = await Promise.all(
      products.map(async (data) => {
        let decryptedData = decryptData(data.product_id)
        const [stock, created] = await db.Stocks.findOrCreate({
          where: {
            product_id: decryptedData,
            warehouse_id: warehouseId,
          },
          defaults: {
            product_id: decryptedData,
            warehouse_id: warehouseId,
            quantity: 0,
          },
          transaction: req.transaction
        });
        return { stock, created, restock: data.amount };
      })
    );
    if (!result) {
      return res.status(400).json({
        message: "Failed to find or create stock journal",
        error: error.toString(),
      });
    }
    req.stock = result;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Failed to find or create stock journal",
      error: error.toString(),
    });
  }
};

module.exports = { checkStock };
