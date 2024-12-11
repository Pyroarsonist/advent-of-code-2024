import { END_CELL, START_CELL } from "./constants";

const scoresMap = new Map();

/**
 *  directions schema
 *    1
 *  2 X 3
 *    4
 */
const directionsDiff = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

const serializeCoordinates = (x, y) => [x, y].join(":");

const startHike = (i, j, matrix) => {
  const routes = [
    { x: i, y: j, height: START_CELL, initialCell: serializeCoordinates(i, j) },
  ];

  while (routes.length) {
    const route = routes.shift();

    for (const [dx, dy] of directionsDiff) {
      const newX = route.x + dx;
      const newY = route.y + dy;
      const newCell = matrix[newX]?.[newY];
      const newHeight = route.height + 1;
      if (newCell !== newHeight) continue;

      if (newCell === END_CELL) {
        const scoreSet = scoresMap.get(route.initialCell) ?? new Set();
        scoreSet.add(serializeCoordinates(newX, newY));
        scoresMap.set(route.initialCell, scoreSet);
      } else {
        routes.push({
          x: newX,
          y: newY,
          height: newHeight,
          initialCell: route.initialCell,
        });
      }
    }
  }
};

const getScoresSum = () => {
  let sum = 0;
  for (const set of scoresMap.values()) {
    sum += set.size;
  }
  return sum;
};

export const getSolution = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const cell = matrix[i][j];
      if (cell === START_CELL) startHike(i, j, matrix);
    }
  }

  return getScoresSum();
};
