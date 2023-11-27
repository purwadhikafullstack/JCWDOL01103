"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
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
      img: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
    }
  );
  return users;
};
