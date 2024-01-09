"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart_Detail extends Model {
    static associate(models) {
      Cart_Detail.belongsTo(models.Cart, {
        foreignKey: "cart_id",
        as: "cart",
      });
      Cart_Detail.belongsTo(models.Products, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }

  Cart_Detail.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cart",
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
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Cart_Detail",
      tableName: "cart_details",
      timestamps: false,
    }
  );

  return Cart_Detail;
};
