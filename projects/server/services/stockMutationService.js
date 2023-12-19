const db = require("../models");
const { distance } = require("../utils/distanceCalculation");

const mutationHandler = async (mutationId, status, transaction) => {
  const mutation = await db.Stock_Mutations.findOne({
    where: { id: mutationId },
    transaction
  });
  if (!mutation) {
    throw new Error("Mutation not found");
  }
  if (["accepted", "auto"].includes(status)) {
    const senderWarehouse = await db.Stocks.findOne({
      where: {
        product_id: mutation.product_id,
        warehouse_id: mutation.from_warehouse_id,
      },
      transaction,
    });
    const destinationWarehouse = await db.Stocks.findOne({
      where: {
        product_id: mutation.product_id,
        warehouse_id: mutation.to_warehouse_id,
      },
      transaction,
    });
    await db.Stocks.decrement("quantity", {
      by: mutation.quantity,
      where: { id: senderWarehouse.id },
      transaction,
    });
    await db.Stocks.increment("quantity", {
      by: mutation.quantity,
      where: { id: destinationWarehouse.id },
      transaction,
    });
    await db.Stock_Journals.create({
      stock_id: senderWarehouse.id,
      quantity_before: senderWarehouse.quantity,
      quantity_after: senderWarehouse.quantity - mutation.quantity,
      amount: mutation.quantity * -1,
    },{transaction});
    await db.Stock_Journals.create({
      stock_id: destinationWarehouse.id,
      quantity_before: destinationWarehouse.quantity,
      quantity_after: destinationWarehouse.quantity + mutation.quantity,
      amount: mutation.quantity,
    },{transaction});
  }
  await db.Stock_Mutations.update(
    { status },
    { where: { id: mutation.id }, transaction }
  );
};

const findNearestWarehouse = async (target, warehouses) => {
  const distances = await warehouses.map((dt) => {
    const currentDistance = distance(
      parseFloat(target.latitude),
      parseFloat(target.longitude),
      parseFloat(dt.latitude),
      parseFloat(dt.longitude)
    );
    return { id: dt.id, distance: currentDistance };
  });
  const sortedDistances = await distances.sort(
    (a, b) => a.distance - b.distance
  );
  return sortedDistances;
};

const checkNearestWarehouseStock = async (warehouses, products) => {
  const result = [];
  for (const product of products) {
    let currentSum = 0;
    const availWarehouse = [];
    for (const warehouse of warehouses) {
      const stock = await db.Stocks.findOne({
        where: {
          warehouse_id: warehouse.id,
          product_id: product.product_id,
        },
      });
      if (stock) {
        if (currentSum === product.stock_needs) {
          break;
        }
        if (currentSum + stock.quantity <= product.stock_needs) {
          availWarehouse.push({
            id: warehouse.id,
            product_id: product.id,
            stockAssist: stock.quantity,
          });
          currentSum += stock.quantity;
          continue
        }
        if (currentSum + stock.quantity > product.stock_needs) {
          availWarehouse.push({
            id: warehouse.id,
            product_id: product.id,
            stockAssist: product.stock_needs - currentSum,
          });
          currentSum += product.stock_needs - currentSum;
          continue
        }
      }
    }
    result.push({
      product_id: product.product_id,
      warehouses: availWarehouse,
    });
  }
  return result;
};



module.exports = {mutationHandler, findNearestWarehouse, checkNearestWarehouseStock}
