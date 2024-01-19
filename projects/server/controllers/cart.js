const { decryptData } = require("../helpers/encrypt");
const db = require("../models");
const cart = db.Cart;
const cart_detail = db.Cart_Detail;
const products = db.Products;
const { Op } = require("sequelize");

const carts = {
  getAllCarts: async (req, res) => {
    try {
      const user_id = req.user.id;
      const carts = await cart.findAll({
        where: { user_id: user_id },
        include: [
          {
            model: cart_detail,
            as: "detail",
            include: [
              {
                model: products,
                as: "product",
              },
            ],
          },
        ],
      });
      res.status(200).json(carts);
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Request Failed",
        error: e.toString(),
      });
    }
  },

  createCart: async (req, res) => {
    const user_id = req.user.id;
    const { product_id, quantity } = req.body;
    const productId = decryptData(product_id);

    try {
      let userCart = await cart.findOne({
        where: {
          user_id: user_id,
        },
      });

      if (!userCart) {
        userCart = await cart.create({ user_id: user_id });
      }

      const productExists = await products.findByPk(productId);
      if (!productExists) {
        return res.status(404).json({
          status: 404,
          message: "Product not found",
        });
      }

      const [cartItem, created] = await cart_detail.findOrCreate({
        where: { cart_id: userCart.id, product_id: productId },
        defaults: { quantity: quantity },
      });

      if (!created) {
        await cartItem.update({ quantity: cartItem.quantity + quantity });
      }

      return res.status(201).json({
        status: 201,
        message: "Product added to cart successfully",
        cartItem,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Failed to add product to cart",
        error: error.toString(),
      });
    }
  },

  deleteCart: async (req, res) => {
    const { id } = req.params;

    try {
      const cartItem = await cart_detail.findByPk(id);

      if (!cartItem) {
        return res.status(404).json({
          status: 404,
          message: "Cart item not found",
        });
      }

      await cartItem.destroy();

      res.status(200).json({
        status: 200,
        message: "Cart item successfully deleted",
      });
    } catch (e) {
      res.status(500).json({
        status: 500,
        message: "Failed to delete cart item",
        error: e.toString(),
      });
    }
  },
};

module.exports = { carts };
