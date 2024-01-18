"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Products_Category extends Model {
    static associate(models) {
      Products_Category.hasMany(models.Products, {
        foreignKey: "product_category_id",
        as: "category",
      });
      Products_Category.hasMany(models.Products_Sub_Category, {
        foreignKey: "product_category_id",
        as: "sub_category",
      });
    }
  }

  Products_Category.init(
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
    },
    {
      sequelize,
      modelName: "Products_Category",
      tableName: "products_category",
      timestamps: true,
    }
  );

  return Products_Category;
};
