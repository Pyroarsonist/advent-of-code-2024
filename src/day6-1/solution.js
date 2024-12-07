import {
  Direction,
  EMPTY_CELL,
  OBSTACLE_CELL,
  START_CELL,
  Velocity,
} from "./constants";

const findPosition = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const cell = matrix[i][j];
      if (cell !== START_CELL) {
        continue;
      }

      return { x: i, y: j };
    }
  }
  return null;
};

const nextDirection = (direction) => {
  const directionArr = [
    Direction.UP,
    Direction.RIGHT,
    Direction.DOWN,
    Direction.LEFT,
  ];

  const index = directionArr.indexOf(direction);
  return directionArr[(index + 1) % directionArr.length];
};

const step = (matrix, visitedMatrix, currentDirection) => {
  let { x, y } = findPosition(matrix);
  const currentVelocity = Velocity[currentDirection];

  let nextCell = matrix[x][y];

  while (true) {
    const prevX = x;
    const prevY = y;
    x += currentVelocity.x;
    y += currentVelocity.y;
    nextCell = matrix[x]?.[y];

    if (nextCell === OBSTACLE_CELL) {
      return {
        isOutOfBounds: false,
        currentDirection: nextDirection(currentDirection),
      };
    }
    if (!nextCell) {
      return {
        isOutOfBounds: true,
        currentDirection: nextDirection(currentDirection),
      };
    }
    visitedMatrix[x][y] = true;
    matrix[x][y] = START_CELL;
    matrix[prevX][prevY] = EMPTY_CELL;
  }
};

function getMovementsMatrix(_matrix) {
  const matrix = JSON.parse(JSON.stringify(_matrix));
  const visitedMatrix = matrix.map((line) =>
    line.map((cell) => cell === START_CELL),
  );

  let isOutOfBounds = false;
  let currentDirection = Direction.UP;
  while (!isOutOfBounds) {
    const stepResult = step(matrix, visitedMatrix, currentDirection);
    isOutOfBounds = stepResult.isOutOfBounds;
    currentDirection = stepResult.currentDirection;
  }
  return visitedMatrix;
}

const getDistinctPositions = (matrix) => {
  let sum = 0;
  for (const line of matrix) {
    for (const item of line) {
      if (item) sum += item;
    }
  }
  return sum;
};
export const getSolution = (matrix) => {
  const movementsMatrix = getMovementsMatrix(matrix);

  return getDistinctPositions(movementsMatrix);
};
