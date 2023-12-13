'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provinces extends Model {
    static associate(models) {
      Provinces.hasMany(models.Cities, {
        foreignKey: "city_id",
        as: "city",
      });
    }
  }
  Provinces.init({
    province_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    province_name: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
  }, {
    sequelize,
    modelName: 'Provinces',
    tableName: 'provinces',
    timestamps: false
  });
  return Provinces;
};