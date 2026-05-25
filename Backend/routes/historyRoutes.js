const express = require("express");

const router = express.Router();

const {
  getRuleHistory,
} = require("../controllers/historyController");

router.get("/", getRuleHistory);

module.exports = router;