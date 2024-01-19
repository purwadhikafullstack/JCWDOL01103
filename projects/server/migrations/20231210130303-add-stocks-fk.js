"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("stocks", {
      fields: ["warehouse_id"],
      type: "foreign key",
      name: "fk_stocks_warehousesId",
      references: {
        table: "warehouses",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("stocks", {
      fields: ["product_id"],
      type: "foreign key",
      name: "fk_stocks_productId",
      references: {
        table: "products",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("stocks", "fk_stocks_warehousesId");
    await queryInterface.removeConstraint("stocks", "fk_stocks_productId");
  },
};
