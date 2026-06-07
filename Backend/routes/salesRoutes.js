const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {

  // Main Summary
  db.query(
    `
    SELECT
      COUNT(*) AS total_transactions,
      IFNULL(SUM(total_amount),0) AS total_revenue,

      IFNULL(
        SUM(
          CASE
            WHEN DATE(created_at)=CURDATE()
            THEN total_amount
            ELSE 0
          END
        ),0
      ) AS today_sales,

      SUM(
        CASE
          WHEN DATE(created_at)=CURDATE()
          THEN 1
          ELSE 0
        END
      ) AS today_orders,

      IFNULL(
        SUM(
          CASE
            WHEN MONTH(created_at)=MONTH(CURDATE())
            AND YEAR(created_at)=YEAR(CURDATE())
            THEN total_amount
            ELSE 0
          END
        ),0
      ) AS monthly_sales,

      IFNULL(
        SUM(
          CASE
            WHEN YEAR(created_at)=YEAR(CURDATE())
            THEN total_amount
            ELSE 0
          END
        ),0
      ) AS yearly_sales

    FROM orders
    `,
    (err, result) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      // Calculate Total Items Sold
      db.query(
        "SELECT items FROM orders",
        (err2, rows) => {

          if (err2) {
            return res.status(500).json(err2);
          }

          let totalItemsSold = 0;

          rows.forEach((row) => {
            if (row.items) {
              totalItemsSold +=
                row.items
                  .split(",")
                  .filter(item => item.trim() !== "")
                  .length;
            }
          });

          res.json({
            total_transactions:
              result[0].total_transactions || 0,

            total_revenue:
              result[0].total_revenue || 0,

            total_items_sold:
              totalItemsSold,

            today_sales:
              result[0].today_sales || 0,

            today_orders:
              result[0].today_orders || 0,

            monthly_sales:
              result[0].monthly_sales || 0,

            yearly_sales:
              result[0].yearly_sales || 0,
          });
        }
      );
    }
  );
});

module.exports = router;