"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const currentDate = new Date();
    await queryInterface.bulkInsert("products", [
      {
        id: 1,
        product_name: "Fender Tom DeLonge Stratocaster Electric Guitar",
        description:
          "Blink-182 guitarist Tom DeLonge has teamed up with Fender once again to release The Tom DeLonge Stratocaster®. This iconic Strat® makes a comeback just in time for Blink's reunion tour and the much-anticipated release of their latest album.",
        product_category_id: 1,
        price: 23650000,
        weight: 6,
        image: null,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 2,
        product_name: "Ibanez Drum",
        description: "New model for newbie drummer, its good for increase your skill",
        product_category_id: 2,
        price: 5000000,
        weight: 20,
        image: null,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 3,
        product_name: "Yamaha Piano",
        description:"Good design and new material, best seller for this year",
        product_category_id: 3,
        price: 3200000,
        weight: 3,
        image: null,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("products");
  },
};
