import { A_TOKENS, B_TOKENS } from "./constants";

const getCramerCoefficients = (prizeSchema) => {
  const D =
    prizeSchema.a.x * prizeSchema.b.y - prizeSchema.b.x * prizeSchema.a.y;

  const Da =
    prizeSchema.prize.x * prizeSchema.b.y -
    prizeSchema.b.x * prizeSchema.prize.y;

  const Db =
    prizeSchema.a.x * prizeSchema.prize.y -
    prizeSchema.prize.x * prizeSchema.a.y;

  return { a: Da / D, b: Db / D };
};

const getTokens = (prizeSchema) => {
  const { a, b } = getCramerCoefficients(prizeSchema);

  if ([a, b].some((uses) => uses !== Math.trunc(uses))) {
    return 0;
  }

  return a * A_TOKENS + b * B_TOKENS;
};

export const getSolution = (prizeSchemas) => {
  let sum = 0;

  for (const prizeSchema of prizeSchemas) {
    const tokens = getTokens(prizeSchema);
    sum += tokens;
  }

  return sum;
};
