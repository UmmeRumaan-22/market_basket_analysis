const db = require("../config/db");

exports.getDashboardStats = (req, res) => {
  const stats = {};

  db.query(
    "SELECT COUNT(*) AS users FROM users",
    (err, userResult) => {
      stats.users = userResult[0].users;

      db.query(
        "SELECT COUNT(*) AS datasets FROM datasets",
        (err, datasetResult) => {
          stats.datasets = datasetResult[0].datasets;

          db.query(
            "SELECT COUNT(*) AS rules FROM rules",
            (err, rulesResult) => {
              stats.rules = rulesResult[0].rules;

              res.status(200).json(stats);
            }
          );
        }
      );
    }
  );
};