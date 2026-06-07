const db = require("../config/db");

exports.createCategory = (req, res) => {
  const { name, description } = req.body;

  db.query(
    "INSERT INTO categories(name, description) VALUES (?, ?)",
    [name, description || null],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: "Category Added"
      });
    }
  );
};

exports.getCategories = (req, res) => {
  db.query(
    "SELECT * FROM categories",
    (err, results) => {
      if (err) return res.status(500).json(err);

      res.json(results);
    }
  );
};

exports.updateCategory = (req, res) => {
  const { name, description } = req.body;

  db.query(
    "UPDATE categories SET name=?, description=? WHERE id=?",
    [name, description, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Category Updated"
      });
    }
  );
};

exports.deleteCategory = (req, res) => {
  db.query(
    "DELETE FROM categories WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Category Deleted"
      });
    }
  );
};