'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token_Resets extends Model {
    static associate(models) {
    }
  }
  Token_Resets.init({
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    token: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    active:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    expiredAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Token_Resets',
    tableName: 'token_resets',
    timestamps: true,
  });
  return Token_Resets;
};