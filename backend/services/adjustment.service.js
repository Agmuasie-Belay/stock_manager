const { StockAdjustment, Product } = require("../models"); // adjust paths as needed

module.exports = {
  async adjustStock({ productId, quantity, reason, userId }) {
    const product = await Product.findByPk(productId);
    if (!product) throw new Error("Product not found.");

    const oldQuantity = product.quantity;
    const newQuantity = oldQuantity + Number(quantity);

    await product.update({ quantity: newQuantity });

    const adjustment = await StockAdjustment.create({
      productId,
      oldQuantity,
      newQuantity,
      reason,
      userId,
    });

    return adjustment;
  },

  async getAll() {
    return StockAdjustment.findAll({
      include: [
        { model: Product, attributes: ["name"] }
      ],
      order: [["createdAt", "DESC"]],
    });
  },
};
