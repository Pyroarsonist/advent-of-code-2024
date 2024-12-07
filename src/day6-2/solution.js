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

function getGuardsTrace(_matrix) {
  const matrix = JSON.parse(JSON.stringify(_matrix));

  let startCoords;
  const visitedMatrix = matrix.map((line, i) =>
    line.map((cell, j) => {
      const isStart = cell === START_CELL;

      if (isStart) {
        startCoords = { x: i, y: j };
      }
      return isStart;
    }),
  );

  let isOutOfBounds = false;
  let currentDirection = Direction.UP;
  while (!isOutOfBounds) {
    const stepResult = step(matrix, visitedMatrix, currentDirection);
    isOutOfBounds = stepResult.isOutOfBounds;
    currentDirection = stepResult.currentDirection;
  }

  const coordinates = [];
  for (let i = 0; i < visitedMatrix.length; i++) {
    for (let j = 0; j < visitedMatrix[0].length; j++) {
      if (!visitedMatrix[i][j]) continue;
      if (startCoords.x === i && startCoords.y === j) {
        continue;
      }
      coordinates.push({ x: i, y: j });
    }
  }
  return coordinates;
}

const checkLoop = (_matrix, obstacleX, obstacleY) => {
  const matrix = JSON.parse(JSON.stringify(_matrix));
  matrix[obstacleX][obstacleY] = OBSTACLE_CELL;

  const visitedMatrix = matrix.map((line) =>
    line.map((cell) => cell === START_CELL),
  );

  const startPosition = findPosition(matrix);

  let currentDirection = Direction.UP;

  const sequence = [
    { x: startPosition.x, y: startPosition.y, direction: currentDirection },
  ];

  while (true) {
    const stepResult = step(matrix, visitedMatrix, currentDirection);
    if (stepResult.isOutOfBounds) {
      return false;
    }
    currentDirection = stepResult.currentDirection;
    const { x, y } = findPosition(matrix);
    const currentSequence = { x, y, direction: currentDirection };

    if (
      sequence.some(
        (seq) =>
          seq.x === currentSequence.x &&
          seq.y === currentSequence.y &&
          seq.direction === currentSequence.direction,
      )
    ) {
      return true;
    }
    sequence.push(currentSequence);
  }
};

export const getSolution = (matrix) => {
  const coordinates = getGuardsTrace(matrix);

  let sum = 0;
  for (const { x, y } of coordinates) {
    const haveLoop = checkLoop(matrix, x, y);
    if (haveLoop) {
      sum++;
    }
  }
  return sum;
};
