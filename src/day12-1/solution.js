const fillColor = (initialX, initialY, colorMatrix, nextColor) => {
  const cellsToFill = [[initialX, initialY]];

  while (cellsToFill.length) {
    const [x, y] = cellsToFill.shift();

    const currentCell = colorMatrix[x][y];
    if (currentCell.color) continue;

    currentCell.color = nextColor;
    const directions = [
      [1, 0],
      [0, 1],
      [0, -1],
      [-1, 0],
    ];

    for (const [dx, dy] of directions) {
      const nextCell = colorMatrix?.[x + dx]?.[y + dy];
      if (nextCell?.cell === currentCell.cell) {
        currentCell.neighborsCount++;
        cellsToFill.push([x + dx, y + dy]);
      }
    }
  }
};

const color = (matrix) => {
  const colorMatrix = matrix.map((row) =>
    row.map((cell) => ({ cell, color: null, neighborsCount: 0 })),
  );

  let nextColor = 1;

  for (let i = 0; i < colorMatrix.length; i++) {
    for (let j = 0; j < colorMatrix[0].length; j++) {
      if (colorMatrix[i][j].color !== null) continue;

      fillColor(i, j, colorMatrix, nextColor);
      nextColor++;
    }
  }

  return { colorMatrix, maxColor: nextColor - 1 };
};

const getGroupsByColor = (colorMatrix) => {
  const groups = {};

  for (let i = 0; i < colorMatrix.length; i++) {
    for (let j = 0; j < colorMatrix[0].length; j++) {
      const cell = colorMatrix[i][j];
      groups[cell.color] ??= { count: 0, neighborsSum: 0 };

      groups[cell.color].count++;
      groups[cell.color].neighborsSum += cell.neighborsCount;
    }
  }

  return groups;
};

const getPrices = (groups) => {
  let sum = 0;

  for (const { count, neighborsSum } of Object.values(groups)) {
    const perimeter = count * 4 - neighborsSum;
    const price = count * perimeter;

    sum += price;
  }

  return sum;
};
export const getSolution = (matrix) => {
  const { colorMatrix, maxColor } = color(matrix);

  const groups = getGroupsByColor(colorMatrix, maxColor);

  return getPrices(groups);
};
