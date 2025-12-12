"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "products",
      [
        {
          sku: "SKU-001",
          name: "USB Flash Drive 32GB",
          category: "Electronics",
          unit: "pcs",
          cost: 150,
          price: 250,
          minStock: 10,
          quantity: 50,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sku: "SKU-002",
          name: "HDMI Cable 1.5m",
          category: "Accessories",
          unit: "pcs",
          cost: 50,
          price: 100,
          minStock: 20,
          quantity: 120,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          sku: "SKU-003",
          name: "Wireless Mouse",
          category: "Electronics",
          unit: "pcs",
          cost: 200,
          price: 350,
          minStock: 15,
          quantity: 80,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("products", null, {});
  },
};
