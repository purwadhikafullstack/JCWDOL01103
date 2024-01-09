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
        product_sub_category_id: 1,
        price: 23650000,
        weight: 6,
        image: "IMG-170167874338043714.webp",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 2,
        product_name: "Yamaha Drum Electronic DTX-6K2X",
        description:
          "Faithfully reproducing the sound and real ambience recorded in famous studios around the world. Create your unique sound with the AMBIENCE, COMP, and EFFECT kit modifier knobs.",
        product_category_id: 2,
        product_sub_category_id: 1,
        price: 15002500,
        weight: 35,
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
