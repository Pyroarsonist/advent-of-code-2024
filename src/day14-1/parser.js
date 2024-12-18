export const parser = (schema) =>
  schema
    .split("\n")
    .filter(Boolean)
    .map((line) =>
      line
        .trim()
        .split(" ")
        .map((x) => x.split("=")[1].split(",").map(Number))
        .map(([x, y]) => ({ x, y })),
    )
    .map(([p, v]) => ({ p, v }));
