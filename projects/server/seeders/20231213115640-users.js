'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        id: "82deacfe-cf47-4c9f-ba6f-778a2629e826",
        name: "Admin 1",
        email: "admin1@soundsense.com",
        password: "$2b$12$sEe9tIclVApMZ.YuhKp0RuVZSK2S8kEUryfiX6YzUqYNoMgkN3bn6",
        role: "admin",
        img: null,
        createdAt: "2023-10-01T00:00:00+07:00",
        updatedAt: "2023-10-01T00:00:00+07:00",
      },
      {
        id: "d5f67d1b-0a45-43bd-927f-074eeab3fe30",
        name: "Master Admin",
        email: "master@soundsense.com",
        password: "$2b$12$Ci4Y2IY90eHxU5K.8KuTqOxy8S41uZsPMh4/ngPV0EGwNxlhY1bri",
        role: "master",
        img: null,
        createdAt: "2023-10-01T00:00:00+07:00",
        updatedAt: "2023-10-01T00:00:00+07:00",
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    queryInterface.bulkDelete("users", null, {});
  }
};
