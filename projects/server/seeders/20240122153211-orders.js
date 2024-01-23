"use strict";

module.exports = {
  async up(queryInterface) {
    const currentDate = new Date();

    await queryInterface.bulkInsert("orders", [
      {
        id: 1,
        user_id: "20deacfe-cf47-4c9f-ba6f-778a2629e826",
        address_id: 1,
        order_status: "pending",
        shipping_id: 1,
        payment_image: "payment1.jpg",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("orders");
  },
};
