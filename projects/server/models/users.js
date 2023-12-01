"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    //   Users.belongsToMany(models.Warehouses, {
    //     through: 'Warehouse_User',
    //     foreignKey: 'warehouse_id',
    //     otherKey: 'user_id',
    //   });
    // }
  }
  Users.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      img: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
    }
  );
  return Users;
};
