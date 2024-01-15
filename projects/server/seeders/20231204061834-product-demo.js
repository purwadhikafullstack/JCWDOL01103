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
        image: "IMG-1703951785693601136.jpeg",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 3,
        product_name: "Sterling by Music Man Ray34 4-String Bass Guitar",
        description:
          "The Sterling by Music Man StingRay 'Ray34' features an all-new roasted maple neck, a 3-band active preamp, a modern contoured body and a bridge modelled after the iconic Ernie Ball Music Man StingRay.",
        product_category_id: 1,
        product_sub_category_id: 1,
        price: 14950000,
        weight: 7,
        image: "IMG-1704091968387500398.jpeg",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 4,
        product_name: "Roland Fantom 06 Professional Workstation",
        description:
          "FANTOM-0 brings your creative world together, combining the sonic power and fluid workflow of the top-of-the-line FANTOM series in streamlined instruments that go everywhere your inspiration takes you.",
        product_category_id: 3,
        product_sub_category_id: 1,
        price: 25500000,
        weight: 5,
        image: "IMG-1704092367453623572.jpeg",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 5,
        product_name: "TC Helicon MP-60 Handheld Vocal Microphone",
        description:
          "This is what every singer deserves: a microphone engineered for the sonic realities of modern vocal performance. You’d expect nothing less from the only pro audio company 100% dedicated to the needs of singers.",
        product_category_id: 6,
        product_sub_category_id: 1,
        price: 1130000,
        weight: 2,
        image: "IMG-1704092490010545542.jpeg",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 6,
        product_name: "Tannoy Gold 5 Active Studio Monitor",
        description:
          "Premium 200 Watt bi-amped nearfield studio reference monitor for accurate sound reproduction with outstanding definition.",
        product_category_id: 5,
        product_sub_category_id: 1,
        price: 3180000,
        weight: 7,
        image: "IMG-1704092662457904457.jpeg",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("products");
  },
};
