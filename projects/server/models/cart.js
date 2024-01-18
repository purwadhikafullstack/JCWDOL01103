"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.Users, {
        foreignKey: "user_id",
        as: "user",
      });
      Cart.hasMany(models.Cart_Detail, { foreignKey: "cart_id", as: "detail" });
    }
  }

  Cart.init(
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
    },
    {
      sequelize,
      modelName: "Cart",
      tableName: "cart",
      paranoid: true,
      timestamps: true,
    }
  );

  return Cart;
};
