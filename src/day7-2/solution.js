const isEquationRight = ({ result, values }) => {
  const maxTernary = 3 ** values.length;

  for (let i = 0; i < maxTernary; i++) {
    let accumulation = values[0];
    let currentValueIndex = 1;

    const ternaryStr = i.toString(3).padStart(values.length - 1, "0");

    for (const e of ternaryStr) {
      if (e === "0") {
        accumulation *= values[currentValueIndex];
      } else if (e === "1") {
        accumulation += values[currentValueIndex];
      } else {
        const str = ["", accumulation, values[currentValueIndex]].join("");
        accumulation = Number(str);
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
