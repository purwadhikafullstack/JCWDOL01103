"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Warehouses extends Model {
    static associate(models) {
      Warehouses.belongsTo(models.Cities, {
        foreignKey: "city_id",
        as: "region",
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
      street: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Warehouses",
      tableName: "warehouses",
    }
  );
  return Warehouses;
};
