"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const currentDate = new Date();

    await queryInterface.bulkInsert("products", [
      {
        product_id: 1,
        product_name: "Fender Tom DeLonge Stratocaster Electric Guitar",
        description:
          "Blink-182 guitarist Tom DeLonge has teamed up with Fender once again to release The Tom DeLonge Stratocaster®. This iconic Strat® makes a comeback just in time for Blink's reunion tour and the much-anticipated release of their latest album.",
        stock: 10,
        product_category_id: 1,
        price: 23650000,
        weight: 6,
        image: null,
        active: true,
        warehouse_id: 1,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("products");
  },
};
