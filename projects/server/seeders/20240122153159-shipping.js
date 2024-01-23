"use strict";

module.exports = {
  async up(queryInterface) {
    const currentDate = new Date();

    await queryInterface.bulkInsert("shipping", [
      {
        id: 1,
        name: "JNE",
        service: "Next Day Delivery",
        warehouse_id: 1,
        address_id: 1,
        weight: 5,
        price: 150000,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("shipping");
  },
};
