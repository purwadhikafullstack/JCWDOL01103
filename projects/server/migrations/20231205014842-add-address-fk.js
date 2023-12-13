"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("addresses", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_address_userId",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("addresses", {
      fields: ["city_id"],
      type: "foreign key",
      name: "fk_address_cityId",
      references: {
        table: "cities",
        field: "city_id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('addresses', 'fk_address_userId');
    await queryInterface.removeConstraint('addresses', 'fk_address_cityId');
  },
};
