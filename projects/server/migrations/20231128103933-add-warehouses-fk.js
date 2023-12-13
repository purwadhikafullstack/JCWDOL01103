'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("warehouses", {
      fields: ["city_id"],
      type: "foreign key",
      name: "fk_warehouses_cityId",
      references: {
        table: "cities",
        field: "city_id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('warehouses', 'fk_warehouses_cityId');
  }
};
