"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("stock_mutations", {
      fields: ["from_warehouse_id"],
      type: "foreign key",
      name: "fk_stock_mutation_fromWarehouseId",
      references: {
        table: "warehouses",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("stock_mutations", {
      fields: ["to_warehouse_id"],
      type: "foreign key",
      name: "fk_stock_mutation_toWarehouseId",
      references: {
        table: "warehouses",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("stock_mutations", {
      fields: ["product_id"],
      type: "foreign key",
      name: "fk_stock_mutation_productId",
      references: {
        table: "products",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('stock_mutations', "fk_stock_mutations_fromWarehouseId");
    await queryInterface.removeConstraint('stock_mutations', "fk_stock_mutations_toWarehouseId");
    await queryInterface.removeConstraint('stock_mutations', "fk_stock_mutations_productId");
  },
};
