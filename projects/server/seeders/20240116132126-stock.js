'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const currentDate = new Date();
    await queryInterface.bulkInsert("stocks", [
      {
        id: 1,
        warehouse_id:1,
        product_id:1,
        quantity:100,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 2,
        warehouse_id:1,
        product_id:2,
        quantity:50,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 3,
        warehouse_id:2,
        product_id:1,
        quantity:5,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 4,
        warehouse_id:2,
        product_id:2,
        quantity:7,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("stocks");
  }
};
