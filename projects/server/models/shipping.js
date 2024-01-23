"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Shipping extends Model {
    static associate(models) {
      Shipping.hasMany(models.Orders, {
        foreignKey: "shipping_id",
        as: "orders",
      });
      Shipping.belongsTo(models.Warehouses, {
        foreignKey: "warehouse_id",
        as: "warehouse",
      });
      Shipping.belongsTo(models.Addresses, {
        foreignKey: "address_id",
        as: "address",
      });
    }
  }

  Shipping.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      service: {
        type: DataTypes.STRING,
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
      address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "addresses",
          key: "id",
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Shipping",
      tableName: "shipping",
      paranoid: true,
      timestamps: true,
    }
  );

  return Shipping;
};
