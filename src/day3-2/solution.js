const getSubstring = (str, indexesToGet) =>
  indexesToGet.map(([from, to]) => str.substring(from, to)).join("");

const fix = (instructions) => {
  const dontToken = "don't()";
  const regex = /(do\(\)|don't\(\))/g;

  const indexesToGet = [];

  let regexResult = regex.exec(instructions);
  let removeIndex = null;
  let addIndex = 0;
  while (regexResult) {
    const token = regexResult[0];

    if (token === dontToken) {
      if (removeIndex === null) {
        indexesToGet.push([addIndex, regexResult.index]);
        removeIndex = regexResult.index;
      }
    } else if (removeIndex !== null) {
      addIndex = regexResult.index;
      removeIndex = null;
    }

    regexResult = regex.exec(instructions);
  }

  if (removeIndex === null) {
    indexesToGet.push([addIndex, instructions.length - 1]);
  }

  return getSubstring(instructions, indexesToGet);
};

export const getSolution = (instructions) => {
  const fixedInstructions = fix(instructions);

  const regex = /mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/g;

  let sum = 0;

  let regexResult = regex.exec(fixedInstructions);
  while (regexResult) {
    const { a, b } = regexResult.groups;

    const product = +a * +b;
    sum += product;

    regexResult = regex.exec(fixedInstructions);
  }

  return sum;
};
