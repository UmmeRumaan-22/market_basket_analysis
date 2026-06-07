const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {

  // Revenue & Orders
  db.query(
    `
    SELECT
      COUNT(*) AS totalOrders,
      IFNULL(SUM(total_amount),0) AS totalRevenue
    FROM orders
    `,
    (err, ordersResult) => {

      if (err) return res.status(500).json(err);

      // Total Products
      db.query(
        `
        SELECT COUNT(*) AS totalProducts
        FROM products
        `,
        (err2, productResult) => {

          if (err2) return res.status(500).json(err2);

          // Total Customers
          db.query(
            `
            SELECT COUNT(DISTINCT customer_name)
            AS totalCustomers
            FROM orders
            `,
            (err3, customerCountResult) => {

              if (err3)
                return res.status(500).json(err3);

              // Top Customers
              db.query(
                `
                SELECT
                  customer_name,
                  COUNT(*) AS total_orders,
                  SUM(total_amount) AS total_spent
                FROM orders
                GROUP BY customer_name
                ORDER BY total_spent DESC
                LIMIT 5
                `,
                (err4, customerResult) => {

                  if (err4)
                    return res.status(500).json(err4);

                  // Low Stock
                  db.query(
                    `
                    SELECT
                      product_name,
                      stock
                    FROM products
                    WHERE stock <= 10
                    ORDER BY stock ASC
                    `,
                    (err5, stockResult) => {

                      if (err5)
                        return res.status(500).json(err5);

                      // Apriori Rules
                      db.query(
                        `
                        SELECT
                          antecedent,
                          consequent,
                          confidence_value
                        FROM rules
                        ORDER BY confidence_value DESC
                        LIMIT 5
                        `,
                        (err6, rulesResult) => {

                          if (err6)
                            return res.status(500).json(err6);

                          res.json({
                            summary: {
                              totalRevenue:
                                ordersResult[0]
                                  .totalRevenue || 0,

                              totalOrders:
                                ordersResult[0]
                                  .totalOrders || 0,

                              totalCustomers:
                                customerCountResult[0]
                                  .totalCustomers || 0,

                              totalProducts:
                                productResult[0]
                                  .totalProducts || 0,
                            },

                            topCustomers:
                              customerResult || [],

                            lowStock:
                              stockResult || [],

                            recommendations:
                              rulesResult || [],
                          });
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

module.exports = router;