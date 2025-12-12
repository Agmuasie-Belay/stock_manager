const { Product, InventoryTransaction } = require("../models");

module.exports = {
  async createTransaction(data) {
    const product = await Product.findByPk(data.productId);
    if (!product) throw new Error("Product not found");

    let newQty = product.quantity;

    if (data.type === "in") newQty += data.quantity;
    if (data.type === "out") {
      if (product.quantity < data.quantity) {
        throw new Error("Insufficient stock");
      }
      newQty -= data.quantity;
    }

    await product.update({ quantity: newQty });

    return InventoryTransaction.create({
      productId: data.productId,
      userId: data.userId,
      type: data.type,
      quantity: data.quantity,
      note: data.note,
    });
  },

  async getAll() {
  const transactions = await InventoryTransaction.findAll({
    include: [{ model: Product }],
    order: [["createdAt", "DESC"]],
  });

  return transactions.map(t => ({
    id: t.id,
    productId: t.productId,
    productName: t.Product?.name || "Unknown",
    type: t.type,
    quantity: t.quantity,
    note: t.note,
    createdAt: t.createdAt,
  }));
}
,
};
