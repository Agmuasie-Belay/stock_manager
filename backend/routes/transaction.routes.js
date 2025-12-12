const router = require("express").Router();
const controller = require("../controllers/transaction.controller");
const auth = require("../middleware/auth");

router.get("/", controller.getAll);
router.post("/", auth, controller.create);

module.exports = router;
