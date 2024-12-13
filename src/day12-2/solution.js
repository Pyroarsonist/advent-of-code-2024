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
    row.map((cell) => ({
      cell,
      color: null,
      neighborsCount: 0,
    })),
  );

  let nextColor = 1;

  for (let i = 0; i < colorMatrix.length; i++) {
    for (let j = 0; j < colorMatrix[0].length; j++) {
      if (colorMatrix[i][j].color !== null) continue;

      fillColor(i, j, colorMatrix, nextColor);
      nextColor++;
    }
  }

  return colorMatrix;
};

const getGroupsByColor = (colorMatrix) => {
  const groups = {};

  for (let i = 0; i < colorMatrix.length; i++) {
    for (let j = 0; j < colorMatrix[0].length; j++) {
      const cell = colorMatrix[i][j];
      groups[cell.color] ??= {
        count: 0,
        horizontalSidesCount: 0,
        verticalSidesCount: 0,
      };

      groups[cell.color].count++;
    }
  }

  for (let i = 0; i < colorMatrix.length; i++) {
    let currentTopEdgeColor = null;
    let currentDownEdgeColor = null;

    for (let j = 0; j < colorMatrix[0].length; j++) {
      const cell = colorMatrix[i]?.[j];
      const topCell = colorMatrix[i - 1]?.[j];
      const downCell = colorMatrix[i + 1]?.[j];

      if (topCell?.color === cell.color) {
        currentTopEdgeColor = null;
      } else if (currentTopEdgeColor !== cell.color) {
        currentTopEdgeColor = cell.color;
        groups[cell.color].horizontalSidesCount++;
      }

      if (downCell?.color === cell.color) {
        currentDownEdgeColor = null;
      } else if (currentDownEdgeColor !== cell.color) {
        currentDownEdgeColor = cell.color;
        groups[cell.color].horizontalSidesCount++;
      }
    }
  }

  for (let j = 0; j < colorMatrix[0].length; j++) {
    let currentLeftEdgeColor = null;
    let currentRightEdgeColor = null;

    for (let i = 0; i < colorMatrix.length; i++) {
      const cell = colorMatrix[i]?.[j];
      const leftCell = colorMatrix[i]?.[j - 1];
      const rightCell = colorMatrix[i]?.[j + 1];

      if (leftCell?.color === cell.color) {
        currentLeftEdgeColor = null;
      } else if (currentLeftEdgeColor !== cell.color) {
        currentLeftEdgeColor = cell.color;
        groups[cell.color].verticalSidesCount++;
      }

      if (rightCell?.color === cell.color) {
        currentRightEdgeColor = null;
      } else if (currentRightEdgeColor !== cell.color) {
        currentRightEdgeColor = cell.color;
        groups[cell.color].verticalSidesCount++;
      }
    }
  }

  return groups;
};

const getPrices = (groups) => {
  let sum = 0;

  for (const {
    count,
    horizontalSidesCount,
    verticalSidesCount,
  } of Object.values(groups)) {
    const sides = horizontalSidesCount + verticalSidesCount;
    const price = count * sides;

    sum += price;
  }

  return sum;
};

export const getSolution = (matrix) => {
  const colorMatrix = color(matrix);

  const groups = getGroupsByColor(colorMatrix);

  return getPrices(groups);
};
