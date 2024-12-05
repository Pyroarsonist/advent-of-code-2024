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

const fixUpdate = (_update, orderRulesWeb) => {
  let update = [..._update];

  const updateLength = update.length;

  for (let i = 1; i <= updateLength; i++) {
    const slice = update.toSpliced(i);
    const couldBePrinted = isUpdatePrinted(slice, orderRulesWeb);
    if (couldBePrinted) continue;

    const modifyItem = slice.at(-1);

    for (let j = 0; j < slice.length; j++) {
      const prevSlice = slice.toSpliced(slice.length - 1, 1);
      const newSlice = prevSlice.toSpliced(j, 0, modifyItem);

      const sliceCouldBePrinted = isUpdatePrinted(newSlice, orderRulesWeb);

      if (sliceCouldBePrinted) {
        update = update.toSpliced(0, newSlice.length, ...newSlice);
        break;
      }
    }
  }

  return update;
};

export const getSolution = ({ updates, orderRules }) => {
  const orderRulesWeb = getOrderRulesWeb(orderRules);
  const notPrintedUpdates = updates.filter(
    (update) => !isUpdatePrinted(update, orderRulesWeb),
  );

  const fixedUpdates = notPrintedUpdates.map((update) =>
    fixUpdate(update, orderRulesWeb),
  );

  return sum(fixedUpdates.map(getAverageItem));
};
