const db = require("../config/db");

class User {
  /*
    Create User
  */

  static create(data, callback) {
    const sql = `
      INSERT INTO users
      (name,email,password)
      VALUES(?,?,?)
    `;

    db.query(
      sql,
      [data.name, data.email, data.password],
      callback
    );
  }

  /*
    Find User By Email
  */

  static findByEmail(email, callback) {
    const sql = `
      SELECT * FROM users
      WHERE email=?
    `;

    db.query(sql, [email], callback);
  }

  /*
    Find User By ID
  */

  static findById(id, callback) {
    const sql = `
      SELECT id,name,email,created_at
      FROM users
      WHERE id=?
    `;

    db.query(sql, [id], callback);
  }

  /*
    Get All Users
  */

  static getAll(callback) {
    const sql = `
      SELECT id,name,email,created_at
      FROM users
      ORDER BY id DESC
    `;

    db.query(sql, callback);
  }

  /*
    Delete User
  */

  static delete(id, callback) {
    const sql = `
      DELETE FROM users
      WHERE id=?
    `;

    db.query(sql, [id], callback);
  }
}

module.exports = User;