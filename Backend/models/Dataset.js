const db = require("../config/db");

class Dataset {
  /*
    Save Uploaded Dataset
  */

  static create(data, callback) {
    const sql = `
      INSERT INTO datasets
      (user_id,file_name,file_path)
      VALUES(?,?,?)
    `;

    db.query(
      sql,
      [
        data.user_id,
        data.file_name,
        data.file_path
      ],
      callback
    );
  }

  /*
    Get All Datasets
  */

  static getAll(callback) {
    const sql = `
      SELECT *
      FROM datasets
      ORDER BY id DESC
    `;

    db.query(sql, callback);
  }

  /*
    Get Dataset By ID
  */

  static findById(id, callback) {
    const sql = `
      SELECT *
      FROM datasets
      WHERE id=?
    `;

    db.query(sql, [id], callback);
  }

  /*
    Get User Datasets
  */

  static getByUser(userId, callback) {
    const sql = `
      SELECT *
      FROM datasets
      WHERE user_id=?
      ORDER BY id DESC
    `;

    db.query(sql, [userId], callback);
  }

  /*
    Delete Dataset
  */

  static delete(id, callback) {
    const sql = `
      DELETE FROM datasets
      WHERE id=?
    `;

    db.query(sql, [id], callback);
  }
}

module.exports = Dataset;