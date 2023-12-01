'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("warehouses", {
      fields: ["province_id"],
      type: "foreign key",
      name: "fk_warehouses_provinceId",
      references: {
        table: "provinces",
        field: "province_id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
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
    await queryInterface.removeConstraint('warehouses', 'fk_warehouses_provinceId');
    await queryInterface.removeConstraint('warehouses', 'fk_warehouses_cityId');
  }
};
