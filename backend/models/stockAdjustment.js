const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "StockAdjustment",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      oldQuantity: { type: DataTypes.INTEGER, allowNull: false },
      newQuantity: { type: DataTypes.INTEGER, allowNull: false },
      reason: { type: DataTypes.TEXT },

      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

      productId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { tableName: "stock_adjustments", timestamps: false }
  );
};
