const router = require("express").Router();

const auth = require("../middleware/authMiddleware");

const {
  getDashboardStats
} = require("../controllers/dashboardController");

router.get("/", auth, getDashboardStats);

module.exports = router;