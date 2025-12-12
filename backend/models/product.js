const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Product",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      sku: { type: DataTypes.STRING, unique: true },
      name: { type: DataTypes.STRING, allowNull: false },
      category: { type: DataTypes.STRING },
      unit: { type: DataTypes.STRING },       // pcs, kg, etc.
      cost: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
      price: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0 },
      minStock: { type: DataTypes.INTEGER, defaultValue: 0 },
      quantity: { type: DataTypes.INTEGER, defaultValue: 0 },  // single-location
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { tableName: "products", timestamps: false }
  );
};
