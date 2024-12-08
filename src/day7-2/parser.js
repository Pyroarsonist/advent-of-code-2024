export const parser = (schema) =>
  schema
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [left, right] = line.split(":");
      const values = right.split(" ").filter(Boolean);
      return {
        result: Number(left),
        values: values.map(Number),
      };
    });
