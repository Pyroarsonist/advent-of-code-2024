import { BLINKING_TIMES, MULTIPLIER } from "./constants";

const cache = {};

const hasEvenNumberOfDigits = (stone) => stone.toString().length % 2 === 0;

const divideStone = (stone) => {
  const str = stone.toString();
  const str1 = str.slice(0, str.length / 2);
  const str2 = str.slice(str.length / 2);

  return [+str1, +str2];
};

const transformStone = (stone) => {
  if (stone === 0) {
    return [1];
  }

  if (hasEvenNumberOfDigits(stone)) {
    return divideStone(stone);
  }

  return [stone * MULTIPLIER];
};

const getStonesCount = (stones, blinkingTimes) => {
  if (blinkingTimes === 0) return stones.length;

  let count = 0;

  for (const stone of stones) {
    const cachedStone = cache[`${stone}:${blinkingTimes}`];
    if (cachedStone) {
      count += cachedStone;

      continue;
    }

    const transformedStones = transformStone(stone);

    const currentStoneCount = getStonesCount(
      transformedStones,
      blinkingTimes - 1,
    );

    cache[`${stone}:${blinkingTimes}`] = currentStoneCount;

    count += currentStoneCount;
  }

  return count;
};

export const getSolution = (stones) => getStonesCount(stones, BLINKING_TIMES);
