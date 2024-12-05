const parseOrderRules = (line) => line.split("|").map(Number);
const parseUpdates = (line) => line.split(",").map(Number);
export const parser = (schema) =>
  schema.split("\n").reduce(
    (acc, line) => {
      if (line.includes("|")) {
        acc.orderRules.push(parseOrderRules(line));
        return acc;
      }
      if (line.includes(",")) {
        acc.updates.push(parseUpdates(line));
        return acc;
      }
      return acc;
    },
    { orderRules: [], updates: [] },
  );
