const express = require("express");

const router = express.Router();

const {
  generateRules,
} = require("../controllers/aprioriController");

// ROUTE
router.post("/generate", generateRules);

module.exports = router;