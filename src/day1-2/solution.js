const getCountMap = (list) => {
  const map = new Map();

  for (const number of list) {
    const currentCount = map.get(number) ?? 0;
    map.set(number, currentCount + 1);
  }

  return map;
};

export const getSolution = (listA, listB) => {
  const map = getCountMap(listB);

  let sum = 0;

  for (const a of listA) {
    const count = map.get(a) ?? 0;

    const score = count * a;
    sum += score;
  }

  return sum;
};
