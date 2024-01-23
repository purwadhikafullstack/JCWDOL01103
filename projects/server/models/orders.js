"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      Orders.belongsTo(models.Users, { foreignKey: "user_id", as: "user" });
      Orders.belongsTo(models.Addresses, {
        foreignKey: "address_id",
        as: "address",
      });
      Orders.hasMany(models.Order_Details, {
        foreignKey: "order_id",
        as: "details",
      });
      Orders.belongsTo(models.Shipping, {
        foreignKey: "shipping_id",
        as: "shipping",
      });
    }
  }

  Orders.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "addresses",
          key: "id",
        },
      },
      order_status: {
        type: DataTypes.ENUM(
          "pending",
          "paid",
          "processing",
          "shipped",
          "delivered",
          "cancelled",
          "returned"
        ),
        allowNull: false,
        defaultValue: "pending",
      },
      shipping_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "shipping",
          key: "id",
        },
      },
      payment_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Orders",
      tableName: "orders",
      paranoid: true,
      timestamps: true,
    }
  );

  return Orders;
};
