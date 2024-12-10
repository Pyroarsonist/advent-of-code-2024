export const parser = (schema) =>
  schema
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("").map(Number));
