"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.hasMany(models.Addresses, {
        foreignKey: "user_id",
        as: "addresses",
      });
      Users.hasOne(models.Warehouses_Users, {
        foreignKey: "id",
        as: "warehouse_admin",
      });
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: DataTypes.TEXT,
      status: {
        type: DataTypes.ENUM("active","inactive","reset"),
        allowNull: false,
        defaultValue: "active", 
      },
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
      paranoid: true,
      timestamps: true,
    }
  );
  return Users;
};
