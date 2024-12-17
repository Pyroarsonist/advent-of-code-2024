import { A_TOKENS, B_TOKENS, MAX_BUTTON_USES } from "./constants";

const useButtons = (prizeSchema, aButtonsUsed, bButtonsUsed) => ({
  x: prizeSchema.a.x * aButtonsUsed + prizeSchema.b.x * bButtonsUsed,
  y: prizeSchema.a.y * aButtonsUsed + prizeSchema.b.y * bButtonsUsed,
});

const getTokens = (prizeSchema) => {
  // a1 * x + b1 * y = aMultiplier * z1
  // a2 * x + b2 * y = z2
  // minimize z = aMultiplier * z1 + z2
  // limit: z1 + z2 <= 100

  let minTokens = Infinity;

  for (let bButtonUsed = 0; bButtonUsed <= MAX_BUTTON_USES; bButtonUsed++) {
    for (let aButtonUsed = 0; aButtonUsed <= MAX_BUTTON_USES; aButtonUsed++) {
      const tokens = aButtonUsed * A_TOKENS + bButtonUsed * B_TOKENS;
      const { x, y } = useButtons(prizeSchema, aButtonUsed, bButtonUsed);

      if (x === prizeSchema.prize.x && y === prizeSchema.prize.y) {
        minTokens = Math.min(minTokens, tokens);
      }
    }
  }

  return Number.isFinite(minTokens) ? minTokens : 0;
};

export const getSolution = (prizeSchemas) => {
  let sum = 0;

  for (const prizeSchema of prizeSchemas) {
    const tokens = getTokens(prizeSchema);
    sum += tokens;
  }

  return sum;
};
