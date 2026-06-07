const db = require("../config/db");

exports.getRules = (req, res) => {
  db.query(
    "SELECT * FROM association_rules ORDER BY id DESC",
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );
};

exports.deleteRule = (req, res) => {
  db.query(
    "DELETE FROM association_rules WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Rule Deleted Successfully",
      });
    }
  );
};