"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("cities", {
      fields: ["province_id"],
      type: "foreign key",
      name: "fk_cities_provinceId",
      references: {
        table: "provinces",
        field: "province_id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('cities', 'fk_cities_provinceId');
  },
};
