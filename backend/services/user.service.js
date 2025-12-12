const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(data) {
    const hash = await bcrypt.hash(data.password, 10);

    return User.create({
      name: data.name,
      email: data.email,
      passwordHash: hash,
      role: data.role || "viewer",
    });
  },

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return null;

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { user, token };
  },

  async getAll() {
    return User.findAll();
  },
};
