"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Addresses.belongsTo(models.Users, {
        foreignKey: 'id',
        as: 'user',
      });
      Addresses.belongsTo(models.Cities, {
        foreignKey: 'city_id',
        as:'region'
      });
      // Addresses.hasOne(models.Cities, {
      //   foreignKey: 'city_id',
      //   as:'region'
      // })
    }
  }
  Addresses.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "cities",
          key: "city_id",
        },
      },
      name: {
        type:DataTypes.STRING,
        allowNull: false
      },
      street: {
        type:DataTypes.STRING,
        allowNull: false
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false,
      },
      is_primary:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: "Addresses",
      tableName: "addresses",
      paranoid: true,
      timestamps: true,
    }
  );
  return Addresses;
};
