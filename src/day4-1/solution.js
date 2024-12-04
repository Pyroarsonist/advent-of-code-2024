const WORD = "XMAS";

const getNextCell = (x, y, matrix) => {
  const line = matrix[x];
  if (!line) return null;

  return line[y];
};

export const getSolution = (matrix) => {
  let count = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const cell = matrix[i][j];

      if (cell !== WORD.at(0)) {
        continue;
      }
      /**
       *  directions schema
       *  1 2 3
       *  4 X 5
       *  6 7 8
       */
      const directionsDiff = [
        [-1, -1],
        [-1, 0],
        [-1, 1],

        [0, -1],
        [0, 1],

        [1, -1],
        [1, 0],
        [1, 1],
      ];

      directionsLoop: for (const [diffX, diffY] of directionsDiff) {
        let currentX = i;
        let currentY = j;

        let currentLetterIndex = 1;
        while (currentLetterIndex !== WORD.length) {
          const nextX = currentX + diffX;
          const nextY = currentY + diffY;
          const nextCell = getNextCell(nextX, nextY, matrix);

          if (!nextCell) {
            continue directionsLoop;
          }
          const currentLetter = WORD[currentLetterIndex];
          if (currentLetter !== nextCell) {
            continue directionsLoop;
          }

          currentX = nextX;
          currentY = nextY;
          currentLetterIndex++;
        }

        count++;
      }
    }
  }
  return count;
};
