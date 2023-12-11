const db = require("../models");

const checkStock = async (req, res, next) => {
  const { product_id, warehouse_id } = req.body;
  try {
    const [stock, created] = await db.Stocks.findOrCreate({
      where: {
        product_id: product_id,
        warehouse_id: warehouse_id,
      },
      defaults: {
        product_id: product_id,
        warehouse_id: warehouse_id,
        quantity: 0,
      },
    });
    req.stock = stock || created
    next()
  } catch (error) {
    return res.status(500).json({
      message: "Failed to find or create stock journal",
      error: error.toString(),
    });
  }
};

module.exports = { checkStock };
