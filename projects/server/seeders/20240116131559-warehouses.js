'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const currentDate = new Date();
    await queryInterface.bulkInsert("warehouses", [
      {
        id: 1,
        name: "Gudang Pusat",
        city_id:152,
        street:"Jl. Jakarta pusat no.1",
        latitude:-6.18180000,
        longitude:106.82230000,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 2,
        name: "Gudang Wilayah 1",
        city_id:152,
        street:"Jl. Gedung sate no.3",
        latitude:-6.92155290,
        longitude:107.61102120,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("warehouses");
  }
};
