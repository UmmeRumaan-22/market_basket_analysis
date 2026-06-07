const express = require("express");
const router = express.Router();
const db = require("../config/db");

/*
====================================
LOW STOCK PRODUCTS
====================================
*/

router.get("/low-stock", (req, res) => {
  const sql = `
    SELECT
      id,
      product_name,
      stock
    FROM products
    WHERE stock <= 10
    ORDER BY stock ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.json(results);
  });
});

/*
====================================
INVENTORY SUMMARY
====================================
*/

router.get("/summary", (req, res) => {
  const sql = `
    SELECT
      COUNT(*) AS total_products,
      SUM(stock) AS total_stock
    FROM products
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);
  });
});

/*
====================================
GENERATE LOW STOCK NOTIFICATIONS
====================================
*/

router.get("/generate-alerts", (req, res) => {
  const sql = `
    SELECT product_name, stock
    FROM products
    WHERE stock <= 10
  `;

  db.query(sql, (err, products) => {
    if (err) {
      return res.status(500).json(err);
    }

    products.forEach((product) => {
      db.query(
        `
        INSERT INTO notifications
        (title, message, type)
        VALUES (?, ?, ?)
      `,
        [
          "Low Stock Alert",
          `${product.product_name} stock is only ${product.stock}`,
          "Inventory",
        ]
      );
    });

    res.json({
      message: "Inventory alerts generated",
      total_alerts: products.length,
    });
  });
});

module.exports = router;