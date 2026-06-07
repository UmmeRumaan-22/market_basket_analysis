const express = require("express");
const router = express.Router();
const db = require("../config/db");

// ADD ORDER
router.post("/", (req, res) => {
  const { customer_name, items, total_amount } = req.body;

  const sql =
    "INSERT INTO orders (customer_name, items, total_amount) VALUES (?, ?, ?)";

  db.query(
    sql,
    [customer_name, items, total_amount],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      const productList = items
        .split(",")
        .map((item) => item.trim());

      productList.forEach((product) => {

        // Reduce Stock
        db.query(
          `
          UPDATE products
          SET stock = stock - 1
          WHERE product_name = ?
          AND stock > 0
          `,
          [product],
          (updateErr) => {
            if (updateErr) {
              console.log(updateErr);
            }

            // Check Remaining Stock
            db.query(
              `
              SELECT stock
              FROM products
              WHERE product_name = ?
              `,
              [product],
              (stockErr, stockResult) => {
                if (stockErr) {
                  console.log(stockErr);
                  return;
                }

                if (
                  stockResult.length > 0 &&
                  stockResult[0].stock <= 10
                ) {
                  // Create Notification
                  db.query(
                    `
                    INSERT INTO notifications
                    (title,message,type)
                    VALUES (?,?,?)
                    `,
                    [
                      "Low Stock Alert",
                      `${product} stock is only ${stockResult[0].stock} remaining`,
                      "warning",
                    ],
                    (notifyErr) => {
                      if (notifyErr) {
                        console.log(
                          "Notification Error:",
                          notifyErr
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        );
      });

      res.json({
        message: "Order Added Successfully",
        id: result.insertId,
      });
    }
  );
});

// GET ALL ORDERS
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM orders ORDER BY id DESC",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
});

// DELETE ORDER
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM orders WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Order Deleted",
      });
    }
  );
});

module.exports = router;