const { apriori } = require("../utils/apyori");

const generateAprioriRules = (
  transactions,
  minSupport,
  minConfidence,
  minLift
) => {
  const results = apriori(transactions, {
    min_support: minSupport,
    min_confidence: minConfidence,
    min_lift: minLift,
  });

  const rules = [];

  for (const rule of results) {
    for (const stat of rule.ordered_statistics) {
      rules.push({
        antecedent: Array.from(stat.items_base).join(", "),
        consequent: Array.from(stat.items_add).join(", "),
        support: rule.support,
        confidence: stat.confidence,
        lift: stat.lift,
      });
    }
  }

  return rules;
};

module.exports = {
  generateAprioriRules,
};