'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    static associate(models) {
      Cities.belongsTo(models.Provinces, {
        foreignKey: 'province_id',
        as: 'province',
      });
      Cities.hasMany(models.Warehouses, {
        foreignKey: "city_id",
        as: "warehouse",
      });
      // Cities.hasMany(models.Addresses, {
      //   foreignKey: "city_id",
      //   as: "region",
      // });
    }
  }
  Cities.init( {
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    province_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "provinces",
        key: "province_id",
      }
    },
    city_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.CHAR(5),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Cities',
    tableName: 'cities',
    timestamps: false
  });
  return Cities;
};