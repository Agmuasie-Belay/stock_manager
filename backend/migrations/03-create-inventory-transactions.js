"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("inventory_transactions", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      type: {
        type: Sequelize.ENUM("in", "out", "adjustment"),
        allowNull: false,
      },

      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      note: {
        type: Sequelize.TEXT,
      },

      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("inventory_transactions");
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_inventory_transactions_type";`);
  },
};
