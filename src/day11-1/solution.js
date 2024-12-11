import { BLINKING_TIMES, MULTIPLIER } from "./constants";

const hasEvenNumberOfDigits = (stone) => stone.toString().length % 2 === 0;

const divideStone = (stone) => {
  const str = stone.toString();
  const str1 = str.slice(0, str.length / 2);
  const str2 = str.slice(str.length / 2);

  return [+str1, +str2];
};

const processStones = (stones) => {
  const newStones = [];

  for (const stone of stones) {
    if (stone === 0) {
      newStones.push(1);
      continue;
    }

    if (hasEvenNumberOfDigits(stone)) {
      newStones.push(...divideStone(stone));
      continue;
    }

    newStones.push(stone * MULTIPLIER);
  }

  return newStones;
};

export const getSolution = (stones) => {
  let nextStones = stones;
  for (let i = 1; i <= BLINKING_TIMES; i++) {
    nextStones = processStones(nextStones);
  }
  return nextStones.length;
};
