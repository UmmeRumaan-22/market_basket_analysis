const fs = require("fs");
const csv = require("csv-parser");

/*
  Read CSV File
  Convert CSV rows into transactions array
*/

const readCSVFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const transactions = [];

    fs.createReadStream(filePath)
      .pipe(csv({ headers: false }))

      .on("data", (row) => {
        const values = Object.values(row)
          .map((item) => item.trim())
          .filter((item) => item !== "");

        if (values.length > 0) {
          transactions.push(values);
        }
      })

      .on("end", () => {
        resolve(transactions);
      })

      .on("error", (error) => {
        reject(error);
      });
  });
};

/*
  Save Generated Rules as CSV
*/

const saveRulesCSV = (rules, outputPath) => {
  return new Promise((resolve, reject) => {
    try {
      let csvContent =
        "Antecedent,Consequent,Support,Confidence,Lift\n";

      rules.forEach((rule) => {
        csvContent += `${rule.antecedent},${rule.consequent},${rule.support},${rule.confidence},${rule.lift}\n`;
      });

      fs.writeFileSync(outputPath, csvContent);

      resolve(outputPath);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  readCSVFile,
  saveRulesCSV
};