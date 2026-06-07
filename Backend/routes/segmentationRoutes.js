const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
  const sql = `
    SELECT 
      customer_name,
      COUNT(*) AS total_orders,
      SUM(total_amount) AS total_spent
    FROM orders
    GROUP BY customer_name
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);

    const data = results.map((c) => {
      let segment = "Low Value";

      if (c.total_orders > 10) segment = "VIP";
      else if (c.total_orders >= 5) segment = "Regular";

      return {
        customer_name: c.customer_name,
        total_orders: c.total_orders,
        total_spent: c.total_spent,
        segment
      };
    });

    res.json(data);
  });
});

module.exports = router;