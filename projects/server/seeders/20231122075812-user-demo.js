"use strict";
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const currentDate = new Date();

    await queryInterface.bulkInsert("users", [
      {
        id: "20deacfe-cf47-4c9f-ba6f-778a2629e826",
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
        id: "92deacfe-cf47-4c9f-ba6f-778a2629e826",
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
        id: "22deacfe-cf47-4c9f-ba6f-778a2629e826",
        name: "master tes",
        email: "mastertes@gmail.com",
        password:
          "$2b$10$sqC/Zt.TqB6Xv01IV6lu2Of8D.bVlje/3Dc9tUWFi06jp2wdxN4Em",
        role: "master",
        image: "IMG-1701255762968192265.jpeg",
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: "82deacfe-cf47-4c9f-ba6f-778a2629e826",
        name: "Admin 1",
        email: "admin1@soundsense.com",
        password:
          "$2b$12$sEe9tIclVApMZ.YuhKp0RuVZSK2S8kEUryfiX6YzUqYNoMgkN3bn6",
        role: "admin",
        image: null,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      {
        id: "d5f67d1b-0a45-43bd-927f-074eeab3fe30",
        name: "Master Admin",
        email: "master@soundsense.com",
        password:
          "$2b$12$Ci4Y2IY90eHxU5K.8KuTqOxy8S41uZsPMh4/ngPV0EGwNxlhY1bri",
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
