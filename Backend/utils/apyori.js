function getSupport(itemset, transactions) {
  let count = 0;

  transactions.forEach((transaction) => {
    const hasItems = itemset.every((item) =>
      transaction.includes(item)
    );

    if (hasItems) {
      count++;
    }
  });

  return count / transactions.length;
}

function apriori(transactions, options) {
  const min_support = options.min_support || 0.01;
  const min_confidence = options.min_confidence || 0.1;
  const min_lift = options.min_lift || 1;

  const items = new Set();

  transactions.forEach((transaction) => {
    transaction.forEach((item) => {
      items.add(item);
    });
  });

  const itemList = Array.from(items);

  const rules = [];

  for (let i = 0; i < itemList.length; i++) {
    for (let j = 0; j < itemList.length; j++) {
      if (i === j) continue;

      const itemA = itemList[i];
      const itemB = itemList[j];

      const supportAB = getSupport(
        [itemA, itemB],
        transactions
      );

      const supportA = getSupport(
        [itemA],
        transactions
      );

      const supportB = getSupport(
        [itemB],
        transactions
      );

      if (supportAB >= min_support) {
        const confidence = supportAB / supportA;

        const lift = confidence / supportB;

        if (
          confidence >= min_confidence &&
          lift >= min_lift
        ) {
          rules.push({
            items: [itemA, itemB],
            support: supportAB,
            ordered_statistics: [
              {
                items_base: [itemA],
                items_add: [itemB],
                confidence,
                lift,
              },
            ],
          });
        }
      }
    }
  }

  return rules;
}

module.exports = {
  apriori,
};