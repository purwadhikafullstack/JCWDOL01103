"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Addresses, {
        foreignKey: "user_id",
        as: "addresses",
      });
      Users.hasOne(models.Cart, {
        foreignKey: "user_id",
        as: "cart",
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
        type: DataTypes.ENUM("active", "inactive", "reset"),
        allowNull: false,
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
      timestamps: true,
    }
  );
  return Users;
};
