const userService = require("../services/user.service");

module.exports = {
  async register(req, res) {
    const user = await userService.register(req.body);
    res.status(201).json(user);
  },

  async login(req, res) {
    const result = await userService.login(req.body.email, req.body.password);
    if (!result) return res.status(401).json({ error: "Invalid credentials" });
    res.json(result);
  },

  async getAll(req, res) {
    const users = await userService.getAll();
    res.json(users);
  },
};
