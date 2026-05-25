const db = require("../config/db");

class Rule {
  /*
    Save Rule
  */

  static create(data, callback) {
    const sql = `
      INSERT INTO rules
      (
        dataset_id,
        antecedent,
        consequent,
        support,
        confidence,
        lift
      )
      VALUES(?,?,?,?,?,?)
    `;

    db.query(
      sql,
      [
        data.dataset_id,
        data.antecedent,
        data.consequent,
        data.support,
        data.confidence,
        data.lift
      ],
      callback
    );
  }

  /*
    Get Rules By Dataset
  */

  static getByDataset(datasetId, callback) {
    const sql = `
      SELECT *
      FROM rules
      WHERE dataset_id=?
      ORDER BY id DESC
    `;

    db.query(sql, [datasetId], callback);
  }

  /*
    Get All Rules
  */

  static getAll(callback) {
    const sql = `
      SELECT *
      FROM rules
      ORDER BY id DESC
    `;

    db.query(sql, callback);
  }

  /*
    Delete Rules By Dataset
  */

  static deleteByDataset(datasetId, callback) {
    const sql = `
      DELETE FROM rules
      WHERE dataset_id=?
    `;

    db.query(sql, [datasetId], callback);
  }

  /*
    Total Rules Count
  */

  static count(callback) {
    const sql = `
      SELECT COUNT(*) AS total
      FROM rules
    `;

    db.query(sql, callback);
  }
}

module.exports = Rule;