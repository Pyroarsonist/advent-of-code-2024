const CROSS = "A";

const getCell = (x, y, matrix) => {
  const line = matrix[x];
  if (!line) return null;

  return line[y];
};

const getCrossSegment = (x, y, matrix) => {
  /**
   * cross items
   * 1 . 2
   * . A .
   * 3 . 4
   */

  const segmentItemsDiffs = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  const items = segmentItemsDiffs.map(([dx, dy]) =>
    getCell(x + dx, y + dy, matrix),
  );

  return items.join("");
};

// rotated cross by 90 degrees
const VALID_CROSS_SEGMENTS = ["MSMS", "MMSS", "SMSM", "SSMM"];

export const getSolution = (matrix) => {
  let count = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const cell = matrix[i][j];

      if (cell !== CROSS) {
        continue;
      }

      const crossSegment = getCrossSegment(i, j, matrix);

      const isCrossSegmentValid = VALID_CROSS_SEGMENTS.includes(crossSegment);

      if (isCrossSegmentValid) {
        count++;
      }
    }
  }
  return count;
};
