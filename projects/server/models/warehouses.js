"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Warehouses extends Model {
    static associate(models) {
      Warehouses.belongsTo(models.Cities, {
        foreignKey: "city_id",
        as: "region",
      });
      Warehouses.hasMany(models.Warehouses_Users, {
        foreignKey: "warehouse_id",
        as: "warehouse_admin",
      });
      Warehouses.hasMany(models.Shipping, {
        foreignKey: "warehouse_id",
        as: "shipping",
      });
    }
  }
  Warehouses.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cities",
          key: "city_id",
        },
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 8),
      },
      longitude: {
        allowNull: false,
        type: DataTypes.DECIMAL(11, 8),
      },
    },
    {
      sequelize,
      modelName: "Warehouses",
      tableName: "warehouses",
      paranoid: true,
      timestamps: true,
    }
  );
  return Warehouses;
};
