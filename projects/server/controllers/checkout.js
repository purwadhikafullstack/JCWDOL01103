const { decryptData } = require("../helpers/encrypt");
const db = require("../models");
const order = db.Orders;
const order_details = db.Order_Details;
const { Op } = require("sequelize");

const orders = {
  createOrder: async (req, res) => {
    try {
      const user_id = req.user.id;
      const { address_id, shipping_id, payment_image } = req.body;
      const newOrder = await Orders.create({
        user_id,
        address_id,
        shipping_id,
        payment_image,
      });

      // Contoh: Menambahkan order details (hardcoded untuk demo)
      await OrderDetails.create({
        order_id: newOrder.id,
        product_id: 1, // Ambil dari req.body
        product_qty: 2, // Ambil dari req.body
        total_price: 20000, // Ambil dari req.body
      });

      res.status(201).json(newOrder);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};

module.exports = { orders };
