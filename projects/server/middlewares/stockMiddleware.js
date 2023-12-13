const db = require("../models");

const checkStock = async (req, res, next) => {
  const { warehouse_id, products } = req.body;
  try {
    const result = await Promise.all(
      products.map(async (data) => {
        const [stock, created] = await db.Stocks.findOrCreate({
          where: {
            product_id: data.product_id,
            warehouse_id: warehouse_id,
          },
          defaults: {
            product_id: data.product_id,
            warehouse_id: warehouse_id,
            quantity: 0,
          },
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
