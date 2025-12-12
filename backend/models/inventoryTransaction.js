const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "InventoryTransaction",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      type: {
        type: DataTypes.ENUM("in", "out", "adjustment"),
        allowNull: false,
      },

      quantity: { type: DataTypes.INTEGER, allowNull: false },
      note: { type: DataTypes.TEXT },

      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

      productId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER },
    },
    { tableName: "inventory_transactions", timestamps: false }
  );
};
