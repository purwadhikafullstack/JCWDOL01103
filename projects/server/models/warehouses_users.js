'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warehouses_Users extends Model {
    static associate(models) {
      Warehouses_Users.belongsTo(models.Warehouses, {
        foreignKey: "warehouse_id",
        as: "warehouse",
      });
      Warehouses_Users.belongsTo(models.Users, {
        foreignKey: "user_id",
        as: "user",
      });
      // Warehouses_Users.hasOne(models.Warehouses, {
      //   foreignKey: "warehouse_id",
      //   as: "addresses",
      // });
    }
  }
  Warehouses_Users.init(
    {
      id: {
        type: DataTypes.BIGINT,
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Warehouses_Users",
      tableName: "warehouses_users"
    }
  );
  return Warehouses_Users;
};