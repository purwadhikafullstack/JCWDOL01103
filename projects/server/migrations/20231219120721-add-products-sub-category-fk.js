"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("products_sub_category", {
      fields: ["product_category_id"],
      type: "foreign key",
      name: "fk_productsSubCategory_productCategoryId",
      references: {
        table: "products_category",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "products_sub_category",
      "fk_productsSubCategory_productCategoryId"
    );
  },
};
