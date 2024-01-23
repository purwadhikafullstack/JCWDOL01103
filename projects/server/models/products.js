"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.hasMany(models.Stocks, {
        foreignKey: "product_id",
        as: "stock",
      });
      Products.belongsTo(models.Products_Category, {
        foreignKey: "product_category_id",
        as: "product_category",
      });
      Products.belongsTo(models.Products_Sub_Category, {
        foreignKey: "product_sub_category_id",
        as: "product_sub_category",
      });
      Products.hasMany(models.Cart_Detail, {
        foreignKey: "product_id",
        as: "cart_detail",
      });
      Products.hasMany(models.Order_Details, {
        foreignKey: "product_id",
        as: "order_details",
      });
    }
  }

  Products.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      product_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products_category",
          key: "id",
        },
      },
      product_sub_category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products_sub_categories",
          key: "id",
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Products",
      tableName: "products",
      paranoid: true,
      timestamps: true,
    }
  );

  return Products;
};
