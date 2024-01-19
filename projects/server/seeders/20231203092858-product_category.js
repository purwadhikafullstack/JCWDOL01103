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
      {
        id: 3,
        name: "keyboards",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 4,
        name: "bass",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 5,
        name: "studio recording",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 6,
        name: "microphones",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 7,
        name: "sound system",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 8,
        name: "dj equipment",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products_category");
  },
};
