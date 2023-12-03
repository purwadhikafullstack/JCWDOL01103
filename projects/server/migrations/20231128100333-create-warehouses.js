"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("warehouses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      city_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      street: {
        type: Sequelize.STRING,
      },
      latitude: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 8),
      },
      longitude: {
        allowNull: false,
        type: Sequelize.DECIMAL(11, 8),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("warehouses");
  },
};
