import { sum } from "./math";
import { quicksort } from "./sort";

export const getSolution = (listA, listB) => {
  const listASorted = quicksort(listA);
  const listBSorted = quicksort(listB);

  const diffs = listASorted.map((a, i) => {
    const b = listBSorted[i];
    return Math.abs(a - b);
  });

  return sum(diffs);
};
