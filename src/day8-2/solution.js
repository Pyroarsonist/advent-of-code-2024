import { EMPTY_CELL } from "./constants";

const getAntennaMap = (matrix) => {
  const map = {};

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const cell = matrix[i][j];
      if (cell === EMPTY_CELL) continue;

      map[cell] ??= [];
      map[cell].push({ x: i, y: j });
    }
  }
  return map;
};

const processAntinodeLines = (coords, matrix, antinodeMatrix) => {
  for (let i = 0; i < coords.length; i++) {
    for (let j = 0; j < coords.length; j++) {
      if (i === j) continue;

      // (y1 - y2) * x + (x2 - x1) * y + (x2 * y1 - x1 * y2) = 0
      const x1 = coords[i].x;
      const y1 = coords[i].y;

      const x2 = coords[j].x;
      const y2 = coords[j].y;
      const lineEquation = (x, y) =>
        (y1 - y2) * x + (x2 - x1) * y + (x1 * y2 - x2 * y1);

      for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[0].length; y++) {
          if (antinodeMatrix[x][y]) continue;

          const lineResult = lineEquation(x, y);
          if (lineResult === 0) {
            antinodeMatrix[x][y] = true;
          }
        }
      }
    }
  }
};

const getUniqueAntinodesCount = (antinodeMatrix) => {
  let sum = 0;
  for (const line of antinodeMatrix) {
    for (const cell of line) {
      if (cell) sum++;
    }
  }
  return sum;
};

export const getSolution = (_matrix) => {
  const matrix = JSON.parse(JSON.stringify(_matrix));
  const antinodeMatrix = matrix.map((line) => line.map(() => false));
  const antennaMap = getAntennaMap(matrix);

  for (const coords of Object.values(antennaMap)) {
    processAntinodeLines(coords, matrix, antinodeMatrix);
  }

  return getUniqueAntinodesCount(antinodeMatrix);
};
