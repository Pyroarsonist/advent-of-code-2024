export const parser = (schema) => {
  const numbers = schema.split("\n").map((row) =>
    row
      .split(" ")
      .filter((x) => x)
      .map(Number),
  );

  const listA = [];
  const listB = [];

  for (const arr of numbers) {
    if (arr.length) {
      listA.push(arr[0]);
      listB.push(arr[1]);
    }
  }

  return [listA, listB];
};
