const db = require("../config/db");

exports.createProduct = (req, res) => {
  const { product_name, category_id, price, stock } = req.body;

  db.query(
    "INSERT INTO products (product_name, category_id, price, stock) VALUES (?, ?, ?, ?)",
    [product_name, category_id, price, stock],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: "Product Added Successfully",
        id: result.insertId,
      });
    }
  );
};

exports.getProducts = (req, res) => {
  db.query(
    `SELECT p.*, c.name AS category_name
     FROM products p
     LEFT JOIN categories c
     ON p.category_id = c.id`,
    (err, results) => {
      if (err) return res.status(500).json(err);

      res.json(results);
    }
  );
};

exports.updateProduct = (req, res) => {
  const { product_name, category_id, price, stock } = req.body;

  db.query(
    "UPDATE products SET product_name=?, category_id=?, price=?, stock=? WHERE id=?",
    [product_name, category_id, price, stock, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Product Updated",
      });
    }
  );
};

exports.deleteProduct = (req, res) => {
  db.query(
    "DELETE FROM products WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Product Deleted",
      });
    }
  );
};