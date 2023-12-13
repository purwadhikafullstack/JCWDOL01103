'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock_Journals extends Model {
    static associate(models) {
      Stock_Journals.belongsTo(models.Stocks, {
        foreignKey: 'stock_id',
        as: 'stock',
      });
    }
  }
  Stock_Journals.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    stock_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "stocks",
        key: "id",
      },
    },
    quantity_before: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity_after: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null
    },
  }, {
    sequelize,
    modelName: 'Stock_Journals',
    tableName: "stock_journals",
    paranoid: true,
    timestamps: true,
  });
  return Stock_Journals;
};