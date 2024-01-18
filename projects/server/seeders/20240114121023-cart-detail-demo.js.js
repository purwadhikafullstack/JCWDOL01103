"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "cart_details",
      [
        {
          id: 1,
          cart_id: 1,
          product_id: 1,
          quantity: 2,
        },
        {
          id: 2,
          cart_id: 2,
          product_id: 2,
          quantity: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("cart_details", null, {});
  },
};
