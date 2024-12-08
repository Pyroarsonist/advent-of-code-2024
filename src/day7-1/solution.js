const isEquationRight = ({ result, values }) => {
  const maxBinary = 2 ** values.length;

  for (let i = 0; i < maxBinary; i++) {
    let accumulation = values[0];
    let currentValueIndex = 1;

    const binaryStr = i.toString(2).padStart(values.length - 1, "0");

    for (const e of binaryStr) {
      if (e === "0") {
        accumulation *= values[currentValueIndex];
      } else {
        accumulation += values[currentValueIndex];
      }
      if (accumulation > result) break;
      currentValueIndex++;
    }

    if (accumulation === result) {
      return true;
    }
  }
  return false;
};

export const getSolution = (equations) => {
  let sum = 0;
  for (const equation of equations) {
    if (isEquationRight(equation)) sum += equation.result;
  }
  return sum;
};
