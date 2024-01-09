"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("products", {
      fields: ["product_category_id"],
      type: "foreign key",
      name: "fk_products_productCategoryId",
      references: {
        table: "products_category",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("products", {
      fields: ["product_sub_category_id"],
      type: "foreign key",
      name: "fk_products_productSubCategoryId",
      references: {
        table: "products_sub_category",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "products",
      "fk_products_productCategoryId"
    );
    await queryInterface.removeConstraint(
      "products",
      "fk_products_productSubCategoryId"
    );
  },
};
