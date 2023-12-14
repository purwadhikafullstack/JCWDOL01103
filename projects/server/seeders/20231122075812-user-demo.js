"use strict";
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const currentDate = new Date();

    await queryInterface.bulkInsert("users", [
      {
        id: uuidv4(),
        user_id: 101,
        name: "user tes",
        email: "usertes@gmail.com",
        password:
          "$2b$10$Jmwb/MKy2EPzqFeKUdoREubTpNaBh3Q9Yz/2SXPC8pwVVu/6EkNVO",
        role: "user",
        image: "IMG-1701255709029812832.jpeg",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: uuidv4(),
        user_id: 102,
        name: "admin tes",
        email: "admintes@gmail.com",
        password:
          "$2b$10$ZsGWlbztRK1tQSvKDY2YJemLd5ff21QQwq7DXu6n7WaOZRpl.FPmi",
        role: "admin",
        image: "IMG-1701255717486267845.jpeg",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: uuidv4(),
        user_id: 103,
        name: "master tes",
        email: "mastertes@gmail.com",
        password:
          "$2b$10$sqC/Zt.TqB6Xv01IV6lu2Of8D.bVlje/3Dc9tUWFi06jp2wdxN4Em",
        role: "master",
        image: "IMG-1701255762968192265.jpeg",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users");
  },
};
