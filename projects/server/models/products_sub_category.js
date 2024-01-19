"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Products_Sub_Category extends Model {
    static associate(models) {
      Products_Sub_Category.belongsTo(models.Products_Category, {
        foreignKey: "product_category_id",
        as: "product_category",
      });
      Products_Sub_Category.hasMany(models.Products, {
        foreignKey: "product_sub_category_id",
        as: "product",
      });
    }
  }

  Products_Sub_Category.init(
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
      product_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "product_category",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Products_Sub_Category",
      tableName: "products_sub_category",
      timestamps: true,
    }
  );

  return Products_Sub_Category;
};
