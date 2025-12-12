"use strict";

const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash("admin123", 10);

    return queryInterface.bulkInsert(
      "users", 
      [
        {
          name: "Administrator",
          email: "admin@example.com",
          passwordHash,
          role: "admin",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(
      "users", 
      { email: "admin@example.com" },
      {}
    );
  },
};
