'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("stock_journals", {
      fields: ["stock_id"],
      type: "foreign key",
      name: "fk_stock_journals_stockId",
      references: {
        table: "stocks",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('stock_journals', "fk_stock_journals_stockId");
  }
};
