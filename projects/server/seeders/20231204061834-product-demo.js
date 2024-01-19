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
      {
        id: 7,
        product_name: "Behringer QX1222USB Xenyx Mixer w/ USB and Effects",
        description:
          "About This Product The compact XENYX QX1222USB mixer allows you to effortlessly achieve premium-quality sound.",
        product_category_id: 5,
        product_sub_category_id: 1,
        price: 3784000,
        weight: 7,
        image: "IMG-1705411264879290885.jpeg",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 8,
        product_name:
          "Aston Microphones Origin Large-diaphragm Condenser Microphone",
        description:
          "This Product This production kit pairs a rock'n'roll black version of Aston’s legendary game-changing microphone, the Origin, with the best-in-class Aston Swiftshield pop filter and shock mount set – everything you need for professional grade recordings of vocals, instruments and pretty much anything else you can throw at it!",
        product_category_id: 6,
        product_sub_category_id: 1,
        price: 5485000,
        weight: 7,
        image: "IMG-1705411364821891486.jpeg",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 9,
        product_name: "EVH 5150 III 50W 6L6 112 CMB Blk 230V Eur",
        description:
          "Packed with powerful tone, the EVH® 5150III® 50W 6L6 112 Combo is arena-sized sound in a tiny, Celestion®-powered form factor for easier transfer.",
        product_category_id: 7,
        product_sub_category_id: 1,
        price: 2210000,
        weight: 20,
        image: "IMG-1705411960949733332.jpeg",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 10,
        product_name: "Korg NC-Q1 Smart Noise Cancelling DJ Headphones",
        description:
          "Best hearing protection and sound control; a new era in headphone monitoring.",
        product_category_id: 8,
        product_sub_category_id: 1,
        price: 4520000,
        weight: 7,
        image: "IMG-1705412015251799811.jpeg",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("products");
  },
};
