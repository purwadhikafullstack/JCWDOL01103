"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "cart",
      [
        {
          id: 1,
          user_id: "20deacfe-cf47-4c9f-ba6f-778a2629e826",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          user_id: "20deacfe-cf47-4c9f-ba6f-778a2629e826",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("cart", null, {});
  },
};
