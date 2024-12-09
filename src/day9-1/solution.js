import { EMPTY_SPACE } from "./constants";

const repeatArr = (item, count) => Array(count).fill(item);

const getDiskMap = (line) => {
  const diskMap = [];
  let currentID = 0;
  for (let i = 0; i < line.length; i++) {
    const count = Number(line[i]);
    if (i % 2 === 0) {
      // id
      diskMap.push(...repeatArr(currentID, count));
      currentID++;
    } else {
      // empty space
      diskMap.push(...repeatArr(EMPTY_SPACE, count));
    }
  }
  return diskMap;
};

const findNextRightNumberIndex = (fileSystem, rightIndex) => {
  for (let i = rightIndex - 1; i !== 0; i--) {
    if (fileSystem[i] !== EMPTY_SPACE) return i;
  }
  return null;
};

const getFileSystemCheckSum = (fileSystem) => {
  let sum = 0;
  let rightIndex = fileSystem.length - 1;

  for (let i = 0; i <= rightIndex; i++) {
    let value;

    if (fileSystem[i] === EMPTY_SPACE) {
      value = fileSystem[rightIndex];
      rightIndex = findNextRightNumberIndex(fileSystem, rightIndex);
    } else {
      value = fileSystem[i];
    }

    sum += i * value;
  }

  return sum;
};

export const getSolution = (line) => {
  const diskMap = getDiskMap(line);

  return getFileSystemCheckSum(diskMap);
};
