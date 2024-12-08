import { inRange } from "./math";
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

const getAntinodes = (coords, matrix) => {
  const antinodes = [];
  for (let i = 0; i < coords.length; i++) {
    for (let j = 0; j < coords.length; j++) {
      if (i === j) continue;

      const x = 2 * coords[j].x - coords[i].x;
      const y = 2 * coords[j].y - coords[i].y;

      if (inRange(x, 0, matrix.length) && inRange(y, 0, matrix[0].length)) {
        antinodes.push({ x, y });
      }
    }
  }

  return antinodes;
};

const getUniqueAntinodes = (antinodes) => {
  const set = new Set(
    antinodes.map((antinode) => `${antinode.x}:${antinode.y}`),
  );

  return [...set.values()].map((key) => {
    const [x, y] = key.split(":");

    return { x: Number(x), y: Number(y) };
  });
};
export const getSolution = (_matrix) => {
  const matrix = JSON.parse(JSON.stringify(_matrix));
  const antennaMap = getAntennaMap(matrix);

  const allAntinodes = [];

  for (const coords of Object.values(antennaMap)) {
    const antinodes = getAntinodes(coords, matrix);
    allAntinodes.push(...antinodes);
  }

  const uniqueAntinodes = getUniqueAntinodes(allAntinodes);

  return uniqueAntinodes.length;
};
