"use strict";

module.exports = {
  async up(queryInterface) {
    const currentDate = new Date();

    await queryInterface.bulkInsert("order_details", [
      {
        id: 1,
        order_id: 1,
        product_id: 1,
        product_qty: 2,
        total_price: 47230000,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("order_details");
  },
};
