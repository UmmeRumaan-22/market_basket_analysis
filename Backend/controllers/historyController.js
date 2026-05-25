const db = require("../config/db");

const getRuleHistory = (req, res) => {
  const sql = `
    SELECT * FROM rules
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.status(200).json(results);
  });
};

module.exports = {
  getRuleHistory,
};