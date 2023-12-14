"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stocks extends Model {
    static associate(models) {
      Stocks.belongsTo(models.Products, {
        foreignKey: "product_id",
        as: "product",
      });
      Stocks.hasMany(models.Stock_Journals, {
        foreignKey: "stock_id",
        as: "stock_journal",
      });
    }
  }
  Stocks.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      warehouse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "warehouses",
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
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Stocks",
      tableName: "stocks",
      paranoid: true,
      timestamps: true,
    }
  );
  return Stocks;
};
