"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const currentDate = new Date();

    await queryInterface.bulkInsert("users", [
      {
        user_id: 1,
        name: "user tes",
        email: "usertes@gmail.com",
        password:
          "$2b$10$Jmwb/MKy2EPzqFeKUdoREubTpNaBh3Q9Yz/2SXPC8pwVVu/6EkNVO",
        role: "user",
        image: null,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        user_id: 2,
        name: "admin tes",
        email: "admintes@gmail.com",
        password:
          "$2b$10$ZsGWlbztRK1tQSvKDY2YJemLd5ff21QQwq7DXu6n7WaOZRpl.FPmi",
        role: "admin",
        image: null,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        user_id: 3,
        name: "master tes",
        email: "mastertes@gmail.com",
        password:
          "$2b$10$sqC/Zt.TqB6Xv01IV6lu2Of8D.bVlje/3Dc9tUWFi06jp2wdxN4Em",
        role: "master",
        image: null,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users");
  },
};
