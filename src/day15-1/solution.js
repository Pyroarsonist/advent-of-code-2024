import {
  BOX_CELL,
  DirectionDiff,
  EMPTY_CELL,
  ROBOT_CELL,
  WALL_CELL,
} from "./constants";

const getCurrentPosition = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === ROBOT_CELL) {
        return { x: i, y: j };
      }
    }
  }

  return null;
};

const getGPS = (matrix) => {
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === BOX_CELL) {
        sum += 100 * i + j;
      }
    }
  }

  return sum;
};

export const getSolution = ({ matrix, sequence }) => {
  const position = getCurrentPosition(matrix);
  let { x } = position;
  let { y } = position;

  for (const direction of sequence) {
    const [dx, dy] = DirectionDiff[direction];
    const nextX = x + dx;
    const nextY = y + dy;

    const nextCell = matrix[nextX][nextY];

    if (nextCell === EMPTY_CELL) {
      matrix[x][y] = EMPTY_CELL;

      x = nextX;
      y = nextY;
      matrix[x][y] = ROBOT_CELL;
      continue;
    }

    if (nextCell === WALL_CELL) {
      continue;
    }

    if (nextCell === BOX_CELL) {
      let nextBoxX = nextX;
      let nextBoxY = nextY;
      let nextBoxCell = matrix[nextBoxX][nextBoxY];

      while (nextBoxCell === BOX_CELL) {
        nextBoxX += dx;
        nextBoxY += dy;

        nextBoxCell = matrix[nextBoxX][nextBoxY];
      }

      if (nextBoxCell === EMPTY_CELL) {
        matrix[x][y] = EMPTY_CELL;
        x = nextX;
        y = nextY;
        matrix[x][y] = ROBOT_CELL;
        matrix[nextBoxX][nextBoxY] = BOX_CELL;
      }
    }
  }

  const gps = getGPS(matrix);

  return gps;
};
