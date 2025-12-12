const transactionService = require("../services/transaction.service");

module.exports = {
  async create(req, res) {
    try {
      const trx = await transactionService.createTransaction({
        ...req.body,
        userId: req.user.id,
      });
      res.status(201).json(trx);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    const data = await transactionService.getAll();
    res.json(data);
  },
};
