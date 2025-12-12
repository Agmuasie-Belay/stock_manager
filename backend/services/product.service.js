const { Product } = require("../models");

module.exports = {
  async getAll() {
    return Product.findAll();
  },

  async getById(id) {
    return Product.findByPk(id);
  },

  async create(data) {
    return Product.create(data);
  },

  async update(id, data) {
    await Product.update(data, { where: { id } });
    return Product.findByPk(id);
  },

  async delete(id) {
    return Product.destroy({ where: { id } });
  },
};
