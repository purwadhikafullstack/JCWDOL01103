"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stock_Mutations extends Model {
    static associate(models) {
      Stock_Mutations.belongsTo(models.Warehouses, {
        foreignKey: "from_warehouse_id",
        as: "from_warehouse",
      });
      Stock_Mutations.belongsTo(models.Warehouses, {
        foreignKey: "to_warehouse_id",
        as: "to_warehouse",
      });
      Stock_Mutations.belongsTo(models.Products, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }
  Stock_Mutations.init(
    {
      from_warehouse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "warehouses",
          key: "id",
        },
      },
      to_warehouse_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "warehouses",
          key: "id",
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("waiting", "accepted", "rejected", "auto", "cancelled"),
        allowNull: false,
        defaultValue: "waiting", 
      },
    },
    {
      sequelize,
      modelName: "Stock_Mutations",
      tableName: "stock_mutations",
    }
  );
  return Stock_Mutations;
};
