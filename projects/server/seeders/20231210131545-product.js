'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("products", [
      {
        id: 1,
        product_name: "Iphone 15 pro max",
        description:"Lorem Ipsum",
        createdAt: "2023-10-01T00:00:00+07:00",
        updatedAt: "2023-10-01T00:00:00+07:00",
      },
      {
        id: 2,
        product_name: "Playstation 5",
        description:"Lorem Ipsum",
        createdAt: "2023-10-01T00:00:00+07:00",
        updatedAt: "2023-10-01T00:00:00+07:00",
      },
      {
        id: 3,
        product_name: "Laptop Alienware",
        description:"Lorem Ipsum",
        createdAt: "2023-10-01T00:00:00+07:00",
        updatedAt: "2023-10-01T00:00:00+07:00",
      },
      {
        id: 4,
        product_name: "Headset Steelseries",
        description:"Lorem Ipsum",
        createdAt: "2023-10-01T00:00:00+07:00",
        updatedAt: "2023-10-01T00:00:00+07:00",
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete("products", null, {});
  }
};
