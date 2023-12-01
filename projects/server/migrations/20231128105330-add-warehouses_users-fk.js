'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("warehouses_users", {
      fields: ["warehouse_id"],
      type: "foreign key",
      name: "fk_warehouses_users_warehouseId",
      references: {
        table: "warehouses",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("warehouses_users", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_warehouses_users_userId",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('warehouses_users', "fk_warehouses_users_warehouseId");
    await queryInterface.removeConstraint('warehouses_users', "fk_warehouses_users_userId");
  }
};
