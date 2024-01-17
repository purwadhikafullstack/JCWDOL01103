'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const currentDate = new Date();
    await queryInterface.bulkInsert("warehouses_users", [
      {
        id: 1,
        user_id: "82deacfe-cf47-4c9f-ba6f-778a2629e826",
        warehouse_id:1,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("warehouses_users");
  }
};
