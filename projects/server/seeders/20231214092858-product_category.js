"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentDate = new Date();

    await queryInterface.bulkInsert("products_category", [
      {
        id: 1,
        name: "guitars",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 2,
        name: "drums",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products_category");
  },
};
