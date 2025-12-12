const router = require("express").Router();
const controller = require("../controllers/adjustment.controller");
const auth = require("../middleware/auth");

router.get("/", controller.getAll);
router.post("/", auth, controller.adjust);

module.exports = router;
