import {
  BOX_CELL,
  DirectionDiff,
  EMPTY_CELL,
  LEFT_BOX_CELL,
  RIGHT_BOX_CELL,
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
      if (matrix[i][j] === LEFT_BOX_CELL) {
        sum += 100 * i + j;
      }
    }
  }

  return sum;
};

const createNewMap = (oldMatrix) => {
  const matrix = [];
  for (const line of oldMatrix) {
    const currentLine = [];
    for (const cell of line) {
      if (cell === WALL_CELL) {
        currentLine.push(cell, cell);
      } else if (cell === BOX_CELL) {
        currentLine.push(LEFT_BOX_CELL, RIGHT_BOX_CELL);
      } else if (cell === EMPTY_CELL) {
        currentLine.push(EMPTY_CELL, EMPTY_CELL);
      } else if (cell === ROBOT_CELL) {
        currentLine.push(ROBOT_CELL, EMPTY_CELL);
      }
    }

    matrix.push(currentLine);
  }

  return matrix;
};

const createKey = (box) => `${box[0]}:${box[1]}`;
const decomposeKey = (coord) => coord.split(":").map(Number);

export const getSolution = ({ matrix: oldMatrix, sequence }) => {
  const matrix = createNewMap(oldMatrix);
  let { x, y } = getCurrentPosition(matrix);

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

    if ([LEFT_BOX_CELL, RIGHT_BOX_CELL].includes(nextCell)) {
      const boxesToMove = [];
      // normalizing boxes coordinates, so left bracket one is main

      if (matrix[nextX][nextY] === RIGHT_BOX_CELL) {
        boxesToMove[0] = [nextX, nextY - 1];
      } else {
        boxesToMove[0] = [nextX, nextY];
      }

      const boxesMarkedForMove = new Set();

      let rollback = false;

      while (boxesToMove.length > 0) {
        const [boxX, boxY] = boxesToMove.shift();
        if (boxesMarkedForMove.has(`${boxX}:${boxY}`)) continue;

        const cellNextLeftX = boxX + dx;
        const cellNextLeftY = boxY + dy;

        const cellNextLeft = matrix[boxX + dx][boxY + dy];
        const cellNextRight = matrix[boxX + dx][boxY + dy + 1];

        if ([cellNextLeft, cellNextRight].includes(WALL_CELL)) {
          rollback = true;
          break;
        }

        const boxesDuplicates = [];

        if (cellNextLeft === LEFT_BOX_CELL) {
          boxesDuplicates.push([cellNextLeftX, cellNextLeftY]);
        }

        if (cellNextLeft === RIGHT_BOX_CELL) {
          boxesDuplicates.push([cellNextLeftX, cellNextLeftY - 1]);
        }

        if (cellNextRight === LEFT_BOX_CELL) {
          boxesDuplicates.push([cellNextLeftX, cellNextLeftY + 1]);
        }

        if (cellNextRight === RIGHT_BOX_CELL) {
          boxesDuplicates.push([cellNextLeftX, cellNextLeftY]);
        }

        const coords = boxesDuplicates.map(createKey);
        const coordsSet = new Set(coords);

        const filteredBoxes = [...coordsSet].map(decomposeKey);

        boxesToMove.push(...filteredBoxes);

        boxesMarkedForMove.add(`${boxX}:${boxY}`);
      }

      if (rollback) {
        continue;
      }

      const boxes = [...boxesMarkedForMove].map(decomposeKey);

      for (const [bx, by] of boxes) {
        matrix[bx][by] = EMPTY_CELL;
        matrix[bx][by + 1] = EMPTY_CELL;
      }

      for (const [bx, by] of boxes) {
        matrix[bx + dx][by + dy] = LEFT_BOX_CELL;
        matrix[bx + dx][by + dy + 1] = RIGHT_BOX_CELL;
      }

      matrix[x][y] = EMPTY_CELL;

      x = nextX;
      y = nextY;
      matrix[x][y] = ROBOT_CELL;
    }
  }

  const gps = getGPS(matrix);

  return gps;
};
