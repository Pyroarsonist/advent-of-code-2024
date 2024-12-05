import { sum } from "./math";

const getAverageItem = (update) => update.at(update.length / 2);
const isUpdatePrinted = (update, orderRulesWeb) => {
  for (let i = 1; i < update.length; i++) {
    const currItem = update[i];
    const prevItem = update[i - 1];
    const currItemWeb = orderRulesWeb[currItem];
    if (!currItemWeb) {
      continue;
    }
    if (currItemWeb.more.has(prevItem)) {
      return false;
    }
  }

  return true;
};
const getOrderRulesWeb = (orderRules) => {
  const web = {};

  for (const [less, more] of orderRules) {
    web[less] ??= {
      less: new Set(),
      more: new Set(),
    };
    web[more] ??= {
      less: new Set(),
      more: new Set(),
    };

    web[less].more.add(more);
    web[more].less.add(less);
  }

  return web;
};

export const getSolution = ({ updates, orderRules }) => {
  const orderRulesWeb = getOrderRulesWeb(orderRules);
  const printedUpdates = updates.filter((update) =>
    isUpdatePrinted(update, orderRulesWeb),
  );

  return sum(printedUpdates.map(getAverageItem));
};
