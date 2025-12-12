const adjustmentService = require("../services/adjustment.service");

module.exports = {
  async adjust(req, res) {
    try {
      const { productId, quantity, reason } = req.body;

      if (!productId || !quantity || !reason) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      const adj = await adjustmentService.adjustStock({
        productId,
        quantity, // can be positive or negative
        reason,
        userId: req.user.id,
      });

      res.status(201).json(adj);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await adjustmentService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
