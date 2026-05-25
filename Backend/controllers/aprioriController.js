const db = require("../config/db");
const fs = require("fs");
const csv = require("csv-parser");

const aprioriService = require("../services/aprioriService");

const generateRules = async (req, res) => {
  try {
    const {
      datasetId,
      minSupport,
      minConfidence,
      minLift,
    } = req.body;

    db.query(
      "SELECT * FROM datasets WHERE id = ?",
      [datasetId],
      (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Database error",
          });
        }

        // IMPORTANT CHECK
        if (!results || results.length === 0) {
          return res.status(404).json({
            message: "Dataset not found",
          });
        }

        const dataset = results[0];

        console.log(dataset);

        const filePath = dataset.file_path;

        // CHECK FILE PATH
        if (!filePath) {
          return res.status(400).json({
            message: "File path missing",
          });
        }

        // CHECK FILE EXISTS
        if (!fs.existsSync(filePath)) {
          return res.status(404).json({
            message: "CSV file not found",
          });
        }

        const transactions = [];

        fs.createReadStream(filePath)
          .pipe(csv())
          .on("data", (row) => {
            const items = Object.values(row)
              .map((item) => String(item).trim())
              .filter((item) => item !== "");

            if (items.length > 0) {
              transactions.push(items);
            }
          })

          .on("end", () => {
            try {
              const rules =
                aprioriService.generateAprioriRules(
                  transactions,
                  parseFloat(minSupport),
                  parseFloat(minConfidence),
                  parseFloat(minLift)
                );

                console.log("Generated Rules:", rules);

              // SAVE RULES
              rules.forEach((rule) => {
  db.query(
    `INSERT INTO rules
    (dataset_id, antecedent, consequent, support_value, confidence_value, lift_value)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      datasetId,
      rule.antecedent,
      rule.consequent,
      rule.support,
      rule.confidence,
      rule.lift,
    ],
    (err) => {
      if (err) {
        console.log("Insert Error:", err);
      }
    }
  );
});

              return res.status(200).json({
                message: "Rules Generated Successfully",
                totalRules: rules.length,
                rules,
              });
            } catch (error) {
              console.log(error);

              return res.status(500).json({
                message: "Error generating rules",
              });
            }
          });
      }
    );
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  generateRules,
};