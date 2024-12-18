import { WALL_CELL } from "./constants";

export const parser = (schema) => {
  const matrix = [];

  const sequence = [];

  for (const line of schema.split("\n")) {
    if (line.includes(WALL_CELL)) {
      matrix.push(line.split(""));
      continue;
    }

    if (line.trim() === "") continue;

    sequence.push(...line.split(""));
  }

  return { matrix, sequence };
};
