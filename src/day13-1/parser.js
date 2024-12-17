export const parser = (schema) => {
  const prizeSchemas = [];
  let currentPrizeSchema = {};
  for (const line of schema.split("\n")) {
    if (line.includes("Button A")) {
      const { groups } = /Button A: X\+(?<x>\d+), Y\+(?<y>\d+)/.exec(line);
      currentPrizeSchema.a = { x: +groups.x, y: +groups.y };
    } else if (line.includes("Button B")) {
      const { groups } = /Button B: X\+(?<x>\d+), Y\+(?<y>\d+)/.exec(line);
      currentPrizeSchema.b = { x: +groups.x, y: +groups.y };
    } else if (line.includes("Prize")) {
      const { groups } = /Prize: X=(?<x>\d+), Y=(?<y>\d+)/.exec(line);
      currentPrizeSchema.prize = { x: +groups.x, y: +groups.y };
    } else {
      prizeSchemas.push(currentPrizeSchema);
      currentPrizeSchema = {};
    }
  }

  return prizeSchemas;
};
