"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order_Details extends Model {
    static associate(models) {
      Order_Details.belongsTo(models.Orders, {
        foreignKey: "order_id",
        as: "order",
      });
      Order_Details.belongsTo(models.Products, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }

  Order_Details.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "orders",
          key: "id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      product_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order_Details",
      tableName: "order_details",
      paranoid: true,
      timestamps: true,
    }
  );

  return Order_Details;
};
