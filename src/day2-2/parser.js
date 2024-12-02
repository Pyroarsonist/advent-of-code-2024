export const parser = (schema) =>
  schema
    .split("\n")
    .filter(Boolean)
    .map((report) => report.split(" ").map(Number));
