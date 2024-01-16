'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const currentDate = new Date();
    await queryInterface.bulkInsert("addresses", [
      {
        id: 1,
        user_id: "20deacfe-cf47-4c9f-ba6f-778a2629e826",
        city_id:39,
        name:"Rumah",
        street:"Jl. Bantul",
        latitude:-7.88585170,
        longitude:110.33060830,
        is_primary:true,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: 2,
        user_id: "20deacfe-cf47-4c9f-ba6f-778a2629e826",
        city_id:17,
        name:"Kantor",
        street:"Jl. Jalan Raya no.1",
        latitude:-8.52610000,
        longitude:115.20740000,
        is_primary:false,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("addresses");
  }
};
