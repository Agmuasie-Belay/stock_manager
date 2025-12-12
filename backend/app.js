require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");          
const auth = require("./middleware/auth");        

const userRoutes = require("./routes/user.routes");  
const productRoutes = require("./routes/product.routes");
const transactionRoutes = require("./routes/transaction.routes");
const adjustmentRoutes = require("./routes/adjustment.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);  

app.use("/api/products", auth, productRoutes);
app.use("/api/transactions", auth, transactionRoutes);
app.use("/api/adjustments", auth, adjustmentRoutes);

app.get("/", (req, res) => {
  res.send("Stock Management API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
  } catch (err) {
    console.error("Unable to connect to DB:", err);
  }
});

module.exports = app;