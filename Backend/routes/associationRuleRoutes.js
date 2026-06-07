const express = require("express");
const router = express.Router();

const {
  getRules,
  deleteRule,
} = require("../controllers/associationRuleController");

router.get("/", getRules);
router.delete("/:id", deleteRule);

module.exports = router;