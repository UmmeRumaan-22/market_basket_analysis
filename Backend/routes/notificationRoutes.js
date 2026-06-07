const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get All Notifications
router.get("/", (req, res) => {
  db.query(
    "SELECT * FROM notifications ORDER BY id DESC",
    (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );
});

// Add Notification
router.post("/", (req, res) => {
  const { title, message, type } = req.body;

  db.query(
    `INSERT INTO notifications
    (title,message,type)
    VALUES (?,?,?)`,
    [title, message, type],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Notification Added",
      });
    }
  );
});

// Delete Notification
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM notifications WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Notification Deleted",
      });
    }
  );
});

module.exports = router;