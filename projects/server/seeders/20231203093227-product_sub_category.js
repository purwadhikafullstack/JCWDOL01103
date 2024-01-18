"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentDate = new Date();

    await queryInterface.bulkInsert("products_sub_category", [
      {
        id: 1,
        product_category_id: 1,
        name: "electric",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 2,
        product_category_id: 1,
        name: "acoustic",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 3,
        product_category_id: 1,
        name: "bass",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 4,
        product_category_id: 2,
        name: "cymbals",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products_sub_category");
  },
};
