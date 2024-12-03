export const getSolution = (instructions) => {
  const regex = /mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/g;

  let sum = 0;

  let regexResult = regex.exec(instructions);
  while (regexResult) {
    const { a, b } = regexResult.groups;

    const product = +a * +b;
    sum += product;

    regexResult = regex.exec(instructions);
  }

  return sum;
};
