const db = require("../config/db");

exports.uploadDataset = (req, res) => {
  try {
    const user_id = req.user.id;

    const file_name = req.file.filename;

    const file_path = req.file.path;

    const sql =
      "INSERT INTO datasets(user_id,file_name,file_path) VALUES(?,?,?)";

    db.query(
      sql,
      [user_id, file_name, file_path],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.status(200).json({
          message: "Dataset Uploaded",
          datasetId: result.insertId
        });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllDatasets = (req, res) => {
  const sql = "SELECT * FROM datasets ORDER BY id DESC";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);
  });
};