const productService = require("../services/product.service");

module.exports = {
  async getAll(req, res) {
    const products = await productService.getAll();
    res.json(products);
  },

  async getById(req, res) {
    const product = await productService.getById(req.params.id);
    if (!product) return res.status(404).json({ error: "Not found" });
    res.json(product);
  },

  async create(req, res) {
    const product = await productService.create(req.body);
    res.status(201).json(product);
  },

  async update(req, res) {
    const product = await productService.update(req.params.id, req.body);
    res.json(product);
  },

  async delete(req, res) {
    await productService.delete(req.params.id);
    res.json({ message: "Deleted" });
  },
};
