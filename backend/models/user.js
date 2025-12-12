const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      name: { type: DataTypes.STRING },
      role: {
        type: DataTypes.ENUM("admin", "manager", "viewer"),
        defaultValue: "viewer",
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    { tableName: "users", timestamps: false }
  );
};
