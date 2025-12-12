const { Sequelize } = require("sequelize");
const UserModel = require("./user");
const ProductModel = require("./product");
const InventoryTransactionModel = require("./inventoryTransaction");
const StockAdjustmentModel = require("./stockAdjustment");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

const User = UserModel(sequelize);
const Product = ProductModel(sequelize);
const InventoryTransaction = InventoryTransactionModel(sequelize);
const StockAdjustment = StockAdjustmentModel(sequelize);

// ---------------------------
//   Associations
// ---------------------------

// User 1 - M InventoryTransactions
User.hasMany(InventoryTransaction, { foreignKey: "userId" });
InventoryTransaction.belongsTo(User, { foreignKey: "userId" });

// Product 1 - M InventoryTransactions
Product.hasMany(InventoryTransaction, { foreignKey: "productId" });
InventoryTransaction.belongsTo(Product, { foreignKey: "productId" });

// User 1 - M StockAdjustments
User.hasMany(StockAdjustment, { foreignKey: "userId" });
StockAdjustment.belongsTo(User, { foreignKey: "userId" });

// Product 1 - M StockAdjustments
Product.hasMany(StockAdjustment, { foreignKey: "productId" });
StockAdjustment.belongsTo(Product, { foreignKey: "productId" });

// Export in CommonJS
module.exports = {
  sequelize,
  User,
  Product,
  InventoryTransaction,
  StockAdjustment,
};
